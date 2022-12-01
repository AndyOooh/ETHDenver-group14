import {ethers} from 'ethers';
import {NextPage} from 'next';
import React, {useContext, useEffect, useState} from 'react';
import {HashLoader} from 'react-spinners';
import {api} from '../api/axios.config';
import {Header} from '../components/Header';
import Main from '../components/Main';
import {Web3Context, Web3ContextType} from '../context/Web3ContextProvider';
// import {countdownHelper} from '../hooks/countdown.helper';
import {useCountDown} from '../hooks/useCountDown';
import {useCountdown2} from '../hooks/useCountDown2';
// import {CountDown, useCountDown2} from '../hooks/useCountDown2';

type statusType = 'loading' | 'idle' | 'requestingTokens' | 'delegatingVotes' | 'voting';

const Lottery: NextPage = () => {
  const {provider, connectedAddress} = useContext(Web3Context) as Web3ContextType;
  const [lotteryContract, setLotteryContract] = useState<ethers.Contract | null>(null);
  const [LOTContract, setLOTContract] = useState<ethers.Contract | null>(null);
  const [balanceLOT, setBalanceLOT] = useState<number | null>(null);
  const [balanceETH, setBalanceETH] = useState<number | null>(null);
  const [isBetsOpen, setIsBetsOpen] = useState<boolean>(false);
  const [prizePool, setPrizePool] = useState(0);
  // const [lotteryClosingTime, setLotteryClosingTime] = useState<Date>();
  const [lotteryClosingTime, setLotteryClosingTime] = useState(new Date());
  const [status, setStatus] = useState<statusType>('loading');

  useEffect(() => {
    connectedAddress ? initialize() : null;
  }, [connectedAddress]);

  const initialize = async (): Promise<void> => {
    console.log('INITIALIZE');
    try {
      const _ETHBalance = await provider?.getBalance(connectedAddress);
      if (_ETHBalance) {
        setBalanceETH(+parseFloat(ethers.utils.formatEther(_ETHBalance)).toFixed(4));
      }
      const {data} = await api.get('/contract-data/Lottery');
      const [lotteryData, LOTData] = data;
      const signer = provider?.getSigner(connectedAddress);
      const _LotteryContract = new ethers.Contract(lotteryData.address, lotteryData.abi, signer);
      setLotteryContract(_LotteryContract);
      const _isBetsOpen = await _LotteryContract.betsOpen();
      console.log('🚀  file: lottery.tsx:51  _isBetsOpen', _isBetsOpen);
      setIsBetsOpen(_isBetsOpen);

      const _prizePool = await _LotteryContract.prizePool();
      console.log('🚀  file: lottery.tsx:49  _prizePool', _prizePool);
      setPrizePool(Number(ethers.utils.formatEther(_prizePool)));

      const _lotteryClosingTime = await _LotteryContract.betsClosingTime();
      const closeTime = new Date(_lotteryClosingTime * 1000);
      console.log('🚀  file: lottery.tsx:41  closeTime', closeTime);
      setLotteryClosingTime(closeTime);
      // setLotteryClosingTime(Date.now() - 1000 * 60 * 60);
      // setLotteryClosingTime(Number(ethers.utils.parseEther( _lotteryClosingTime)));

      const tokenAddress = await _LotteryContract.paymentToken();
      const _LOTContract = new ethers.Contract(tokenAddress, LOTData.abi, signer);
      setLOTContract(_LOTContract);
      const _LOTBalance = await _LOTContract.balanceOf(connectedAddress);
      setBalanceLOT(parseFloat(ethers.utils.formatEther(_LOTBalance)));
      setStatus('idle');
    } catch (error) {
      console.log(error);
      // throw new Error(error);
    }
  };

  const handleCloseLottery = async (): Promise<void> => {
    setStatus('loading');
    const tx = await lotteryContract?.closeLottery();
    const receipt = await tx.wait();
    setIsBetsOpen(false);
    console.log(`Bets closed (${receipt})\n`);
    setStatus('idle');
  };

  const [totalSecondsLeft, days, hours, minutes, seconds] = useCountdown2(lotteryClosingTime);
  console.log('🚀  file: lottery.tsx:83  totalSecondsLeft', totalSecondsLeft);

  let lotteryStatus;
  !isBetsOpen
    ? (lotteryStatus = <span className="text-red-600">Closed</span>)
    : totalSecondsLeft > 0
    ? (lotteryStatus = (
        <>
          <span className="text-green-600">Open</span>
          <div>
            Lottery ending in {days} day {hours} hours {minutes}
            minutes {seconds} seconds
          </div>
          <button
            // onClick={}
            disabled={false}
            className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
          >
            Bet
          </button>
        </>
      ))
    : (lotteryStatus = (
        <>
          <span className="text-green-600 mr-4">Time is up. You can now </span>
          <button
            // onClick={}
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
      {status === 'loading' ? (
        <HashLoader color="#FCD34D" size={60} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <Main>
          <h1 className="text-7xl font-bold text-slate-50">Lottery dApp</h1>
          <p className="text-2xl font-semibold text-yellow-200 mb-3">Group 14 - Week 5</p>

          <p>{balanceETH} ETH</p>
          <p>{balanceLOT} LOT</p>

          <p>Lottery status: {lotteryStatus}</p>
          <p>Current prize pool: {prizePool} </p>
          <div className="flex gap-8">
            <button
              // onClick={}
              disabled={false}
              className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
            >
              Buy LOT
            </button>
            <button disabled={false} className="btn">
              Swap LOT to ETH
            </button>
          </div>

          <button
            // onClick={}
            disabled={false}
            className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
          >
            Claim prizes
          </button>
        </Main>
      )}
    </>
  );
};

export default Lottery;
