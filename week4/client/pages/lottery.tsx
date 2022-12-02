import {BigNumber, ethers} from 'ethers';
import {NextPage} from 'next';
import React, {useContext, useEffect, useState} from 'react';
import {HashLoader} from 'react-spinners';
import {api} from '../api/axios.config';
import {BalanceCard} from '../components/BalanceCard';
import {DisconnectMessage} from '../components/DisconnectMessage';
import {Header} from '../components/Header';
import Main from '../components/Main';
import {Web3Context, Web3ContextType} from '../context/Web3ContextProvider';
import {useCountdown} from '../hooks/useCountDown';

type Status =
  // 'disconnected'
  'loading' | 'idle' | 'buyingTokens' | 'betting';

const Lottery: NextPage = () => {
  const {provider, connectedAddress} = useContext(Web3Context) as Web3ContextType;
  const [lotteryContract, setLotteryContract] = useState<ethers.Contract | null>(null);
  const [LOTContract, setLOTContract] = useState<ethers.Contract | null>(null);
  const [balanceLOT, setBalanceLOT] = useState<number | null>(null);
  const [balanceETH, setBalanceETH] = useState<number | null>(null);
  const [isBetsOpen, setIsBetsOpen] = useState<boolean>(false);
  const [prizePool, setPrizePool] = useState(0);
  const [ownerPool, setOwnerPool] = useState(0);
  const [lotteryClosingTime, setLotteryClosingTime] = useState(new Date());
  const [purchaseRatio, setPurchaseRatio] = useState(0);
  const [betFee, setBetFee] = useState<BigNumber>();
  const [amountLOT, setAmountLOT] = useState('0');
  const [timesBet, setTimesBet] = useState('1');
  const [status, setStatus] = useState<Status>('loading');
  const [totalSecondsLeft, days, hours, minutes, seconds] = useCountdown(
    lotteryClosingTime,
    isBetsOpen
  );

  useEffect(() => {
    connectedAddress ? initialize() : null;
  }, [connectedAddress]);

  const initialize = async (): Promise<void> => {
    console.log('Initializing...');
    try {
      getAndSetETH();
      const {data} = await api.get('/contract-data/Lottery');
      const [lotteryData, LOTData] = data;
      const signer = provider?.getSigner(connectedAddress);
      const _LotteryContract = new ethers.Contract(lotteryData.address, lotteryData.abi, signer);
      setLotteryContract(_LotteryContract);
      const _isBetsOpen = await _LotteryContract.betsOpen();
      setIsBetsOpen(_isBetsOpen);

      getAndSetPrizePool(_LotteryContract);
      getAndSetOwnerPool(_LotteryContract);

      const _lotteryClosingTime = await _LotteryContract.betsClosingTime();
      const closeTime = new Date(_lotteryClosingTime * 1000);
      setLotteryClosingTime(closeTime);

      const _purchaseRatio = await _LotteryContract.purchaseRatio();
      setPurchaseRatio(_purchaseRatio.toString());

      const _betFee = await _LotteryContract.betFee();
      setBetFee(_betFee);

      const tokenAddress = await _LotteryContract.paymentToken();
      const _LOTContract = new ethers.Contract(tokenAddress, LOTData.abi, signer);
      setLOTContract(_LOTContract);

      getAndSetLOT(_LOTContract);
      setStatus('idle');
    } catch (error) {
      console.log(error);
      // throw new Error(error);
    }
  };

  const getAndSetETH = async (): Promise<void> => {
    const _ETHBalance = await provider?.getBalance(connectedAddress);
    if (_ETHBalance) {
      setBalanceETH(+parseFloat(ethers.utils.formatEther(_ETHBalance)).toFixed(4));
    }
  };

  const getAndSetLOT = async (contract: ethers.Contract): Promise<void> => {
    const _LOTBalance = await contract?.balanceOf(connectedAddress);
    setBalanceLOT(parseFloat(ethers.utils.formatEther(_LOTBalance)));
  };

  const getAndSetPrizePool = async (contract: ethers.Contract): Promise<void> => {
    const _prizePool = await contract?.prizePool();
    setPrizePool(parseFloat(ethers.utils.formatEther(_prizePool)));
  };

  const getAndSetOwnerPool = async (contract: ethers.Contract): Promise<void> => {
    const _ownerPool = await contract?.ownerPool();
    setOwnerPool(parseFloat(ethers.utils.formatEther(_ownerPool)));
  };

  const getApproval = async (amountBn: BigNumber): Promise<void> => {
    try {
      console.log('approving...');
      const txApproval = await LOTContract?.approve(lotteryContract?.address, amountBn);
      await txApproval.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBetAmountChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {value} = e.target;
    setTimesBet(value);
  };

  const handleBet = async (): Promise<void> => {
    if (!betFee || !LOTContract || !lotteryContract) return;
    setStatus('betting');
    const betPlusFeeBn = ethers.utils.parseEther(timesBet).mul(betFee);
    try {
      let txResponse;
      await getApproval(betPlusFeeBn);
      await LOTContract?.allowance(connectedAddress, lotteryContract?.address);
      if (timesBet === '1') {
        txResponse = await lotteryContract?.bet();
      } else {
        txResponse = await lotteryContract?.betMany(timesBet);
      }
      await txResponse?.wait();
      console.log(`Placed ${timesBet} bets in the lottery`);
    } catch (error) {
      console.log(error);
    }
    getAndSetETH();
    getAndSetLOT(LOTContract);
    getAndSetOwnerPool(lotteryContract);
    getAndSetPrizePool(lotteryContract);
    setStatus('idle');
  };

  const handleCloseLottery = async (): Promise<void> => {
    setStatus('loading');
    try {
      const tx = await lotteryContract?.closeLottery();
      const receipt = await tx.wait();
      setIsBetsOpen(false);
      console.log(`Bets closed (${receipt})\n`);
    } catch (error) {
      console.log(error);
    }
    setStatus('idle');
  };

  const handleClaimPrizes = async (): Promise<void> => {
    if (!lotteryContract || !LOTContract) return;
    setStatus('loading');
    try {
      const prize = await lotteryContract.prize(connectedAddress);
      console.log('🚀  file: lottery.tsx:158  prize', prize);
      console.log('prize', ethers.utils.formatEther(prize));
      if (prize.gt(0)) {
        try {
          await lotteryContract?.prizeWithdraw(prize);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log('prize claimed');
    getAndSetLOT(LOTContract);
    getAndSetPrizePool(lotteryContract);
    setStatus('idle');
  };

  const handleBuyOrSwapChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {value} = e.target;
    setAmountLOT(value);
  };

  const handleBuyOrSwap = async (type: string): Promise<void> => {
    if (!LOTContract) return;
    setStatus('buyingTokens');
    const amount = type === 'buy' ? (Number(amountLOT) / purchaseRatio).toString() : amountLOT;
    const amountParsed = ethers.utils.parseEther(amount);
    try {
      if (type === 'buy') {
        const txResponse = await lotteryContract?.purchaseTokens({
          value: amountParsed
        });
        await txResponse.wait();
      } else if (type === 'swap') {
        await getApproval(amountParsed);
        const txSwap = await lotteryContract?.returnTokens(amountParsed);
        await txSwap.wait();
      }
    } catch (error) {
      console.log(error);
    }
    setAmountLOT('0');
    getAndSetLOT(LOTContract);
    getAndSetETH();
    setStatus('idle');
  };

  let lotteryStatusContent;
  !isBetsOpen
    ? (lotteryStatusContent = (
        <p>
          Lottery status: <span className="text-red-600">Closed</span>
        </p>
      ))
    : totalSecondsLeft > 0
    ? (lotteryStatusContent = (
        <>
          <p>
            Lottery status: <span className="text-green-600">Open</span>
          </p>
          <div>
            Lottery ending in:{' '}
            <span className="text-orange-500 font-bold">
              {days} days {hours} hours {minutes} minutes {seconds} seconds
            </span>
          </div>
          <div className="w-1/4 flex gap-4">
            <input
              onChange={handleBetAmountChange}
              type="number"
              min={1}
              max={Number(balanceLOT)}
              name="amount"
              id="amount"
              placeholder="1"
              size={1000}
              // eslint-disable-next-line max-len
              className="w-1/3 text-white placeholder-white even-inner-shadow rounded-md border-solid text-lg text-center  bg-white bg-opacity-25 p-2"
            />
            <button onClick={handleBet} disabled={balanceLOT === 0} className="btn w-2/3">
              Bet
            </button>
          </div>
        </>
      ))
    : (lotteryStatusContent = (
        <>
          <p>
            Lottery status: <span className="text-green-600 mr-4">Time is up. You can now </span>
          </p>
          <button
            onClick={handleCloseLottery}
            disabled={false}
            className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
          >
            Close lottery
          </button>
        </>
      ));

  return (
    <>
      <Header />
      <Main title="Lottery dApp" subtitle="Group 14 - Week 5">
        {!connectedAddress ? (
          <DisconnectMessage />
        ) : status === 'loading' || status == 'buyingTokens' || status == 'betting' ? (
          <>
            <HashLoader
              color="#FCD34D"
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p>
              {status === 'betting'
                ? 'Placing your bets...'
                : status === 'buyingTokens'
                ? 'Buying tokens..'
                : 'Loading...'}{' '}
            </p>
          </>
        ) : (
          <>
            {lotteryStatusContent}
            <p>Current prize pool: {prizePool} LOT</p>
            <p className="text-xs">Current owner pool: {ownerPool} LOT</p>
            <button
              onClick={handleClaimPrizes}
              disabled={false}
              className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
            >
              Claim prize
            </button>
            <p>Balances</p>
            <div className="grid grid-cols-2 gap-8 text-center">
              <BalanceCard text="ETH" value={balanceETH} />
              <BalanceCard text="LOT" value={balanceLOT?.toFixed(1)} />
            </div>

            <form action="" className="flex flex-col justify-center">
              <div
                id="buttons"
                className="w-2/3 mx-auto grid grid-cols-2 gap-8 my-5 text-lg whitespace-nowrap "
              >
                <button
                  onClick={(): Promise<void> => handleBuyOrSwap('buy')}
                  disabled={
                    !balanceETH ||
                    status !== 'idle' ||
                    amountLOT === '0' ||
                    Number(amountLOT) > balanceETH * purchaseRatio
                  }
                  // eslint-disable-next-line max-len
                  className="btn disabled:bg-gray-300 "
                >
                  Buy LOT
                </button>
                <button
                  onClick={(): Promise<void> => handleBuyOrSwap('swap')}
                  disabled={
                    !balanceLOT ||
                    status !== 'idle' ||
                    amountLOT === '0' ||
                    Number(amountLOT) > balanceLOT
                  }
                  className="btn disabled:bg-gray-300"
                >
                  Swap LOT for ETH
                </button>
              </div>
              <div className="w-2/3 mx-auto grid grid-cols-3 gap-4 items-center">
                <p className="text-right">Amount: </p>
                <input
                  onChange={handleBuyOrSwapChange}
                  type="number"
                  min={0}
                  step={1}
                  name="amount"
                  id="amount"
                  placeholder="0"
                  size={2}
                  // eslint-disable-next-line max-len
                  className=" w-full  text-white placeholder-white even-inner-shadow rounded-md border-solid text-lg   bg-white bg-opacity-25 p-2"
                />
                <p className="whitespace-nowrap">= {Number(amountLOT) / purchaseRatio} ETH</p>
              </div>
            </form>
          </>
        )}
      </Main>
    </>
  );
};

export default Lottery;
