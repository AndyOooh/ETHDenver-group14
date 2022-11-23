import {BigNumber, ethers} from 'ethers';
import {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {HashLoader} from 'react-spinners';
import {api} from '../api/axios.config';

type ConnectedProps = {
  provider: ethers.providers.Web3Provider | undefined;
  connectedAddress: string;
};

type VoteData = {
  proposal: string;
  amount: number;
};

type Proposal = {
  name: string;
  voteCount: number;
};

export const Connected: NextPage<ConnectedProps> = ({provider, connectedAddress}) => {
  const [myTokenContract, setMyTokenContract] = useState<ethers.Contract | null>(null);
  const [ballotContract, setBallotContract] = useState<ethers.Contract | null>(null);
  const [balanceWEEK4, setBalanceWEEK4] = useState<number | null>(null);
  const [balanceETH, setBalanceETH] = useState<number | null>(null);
  const [votingPower, setVotingPower] = useState<number>(0);
  const [status, setStatus] = useState<
    'loading' | 'idle' | 'requestingTokens' | 'delegatingVotes' | 'voting'
  >('loading');
  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal[] | null>(null);

  useEffect(() => {
    initialize();
  }, [connectedAddress]);

  useEffect(() => {
    if (voteData?.proposal && voteData?.amount) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [voteData]);

  const initialize = async (): Promise<void> => {
    try {
      const {data} = await api.get('/token-address');
      const [myTokenData, ballotData] = data;
      const signer = provider?.getSigner(connectedAddress);
      const _MyTokenContract = new ethers.Contract(myTokenData.address, myTokenData.abi, signer);
      console.log('🚀 ~ file: Connected.tsx ~ line 53 ~ _MyTokenContract', _MyTokenContract)
      setMyTokenContract(_MyTokenContract);
      console.log('before*****************')
      console.log('🚀 ~ file: Connected.tsx ~ line 57 ~ connectedAddress', connectedAddress)
      const _WEEK4Balance = await _MyTokenContract.balanceOf(connectedAddress);
      console.log('after*****************')
      setBalanceWEEK4(parseFloat(ethers.utils.formatEther(_WEEK4Balance)));
      const _ETHBalance = await provider?.getBalance(connectedAddress);
      // Use if to satisfy ts.
      if (_ETHBalance) {
        setBalanceETH(+parseFloat(ethers.utils.formatEther(_ETHBalance)).toFixed(4));
      }
      const _BallotContract = new ethers.Contract(ballotData.address, ballotData.abi, signer);
      setBallotContract(_BallotContract);
      const _votingPower = await _BallotContract.votingpower(connectedAddress);
      setVotingPower(parseFloat(ethers.utils.formatEther(_votingPower)));
      const _proposals = await getProposals(_BallotContract);
      setProposals(_proposals);
      setStatus('idle');
    } catch (error) {
      console.log(error)
      // throw new Error(error);
    }
  };

  const getProposals = async (ballotContract: ethers.Contract): Promise<Proposal[] | null> => {
    if (!ballotContract) return null;
    const _proposals: Proposal[] = [];
    for (let i = 0; i < 3; i++) {
      const proposal = await ballotContract?.proposals(i);
      console.log('🚀 ~ file: Connected.tsx ~ line 85 ~ proposal', proposal);
      const nameString = ethers.utils.parseBytes32String(proposal.name);
      const voteCountInt = parseFloat(ethers.utils.formatEther(proposal.voteCount));
      _proposals.push({name: nameString, voteCount: voteCountInt});
    }
    return _proposals;
  };

  const handleRequestTokens = async (): Promise<void> => {
    setStatus('requestingTokens');
    try {
      await api.post('/request-tokens', {
        toAddress: connectedAddress
      });
      console.log(`Minted 2 WEEK4 to ${connectedAddress}`);
      setBalanceWEEK4(prev => (prev ? prev + 2 : 2));
    } catch (error) {
      //  Should maybe log it instead
      console.log(error);
    }
    setStatus('idle');
  };

  const handleDelegateVotes = async (): Promise<void> => {
    setStatus('delegatingVotes');
    try {
      const txResponse = await myTokenContract?.delegate(connectedAddress);
      await txResponse.wait();
      initialize();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote: React.FormEventHandler<HTMLFormElement> = async (e): Promise<void> => {
    setStatus('voting');
    e.preventDefault();
    const {proposal, amount} = voteData as VoteData;
    const amontEth = ethers.utils.parseEther(amount.toString());
    try {
      const txResponse = await ballotContract?.vote(
        BigNumber.from(proposal),
        BigNumber.from(amontEth)
      );
      await txResponse?.wait();
      initialize();
    } catch (error) {
      console.log(error);
    }
  };

  const formChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {value, name} = e.target;
    setVoteData({...voteData, [name]: value} as VoteData);
  };

  //  return -----------------------------------
  const walletString = connectedAddress?.slice(0, 6) + '...' + connectedAddress?.slice(-4);
  return status === 'loading' ? (
    <HashLoader color="#FCD34D" size={60} aria-label="Loading Spinner" data-testid="loader" />
  ) : (
    <>
      <h2 className="text-4xl font-light text-white ">
        Connected to {provider?.connection.url} with {walletString} on {provider?._network?.name}
      </h2>

      <div className="m flex gap-7 mt-6 text-slate-200 text-lg font-medium">
        <div className="card">
          <span>Ether Balance:</span> <span>{balanceETH}</span>{' '}
        </div>
        <div className="card">
          <span>WEEK4 Balance:</span> <span>{balanceWEEK4}</span>{' '}
        </div>
        <div className="card">
          <span>Voting Power:</span> <span>{votingPower}</span>{' '}
        </div>
      </div>

      <p className="text-2xl text-slate-50 mt-6">Vote count</p>
      <div className="m flex gap-7  text-slate-200 text-lg font-medium">
        {proposals?.map(proposal => (
          <div key={proposal.name} className="flex flex-col">
            <span>{proposal.name} </span> <span>{proposal.voteCount}</span>{' '}
          </div>
        ))}
      </div>

      {status === 'requestingTokens' || status === 'voting' ? (
        <div className="flex flex-col gap-8 items-center  mt-8">
          <p className="text-xl text-orange-400 font-bold">
            Hang on.
            {status === 'voting' ? ' Placing your votes' : ' Minting 2 WEEK4 tokens to your wallet'}.
            This could take up to a minute depending on network activity...
          </p>
          <HashLoader color="#FB923C" size={60} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <>
          <div
            id="buttons"
            className="min-w-lg max-w-lg flex gap-4 my-5 text-lg whitespace-nowrap "
          >
            <button
              onClick={handleRequestTokens}
              disabled={false}
              className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
            >
              Request tokens
            </button>
            <button
              onClick={handleDelegateVotes}
              disabled={false}
              className=" bg-yellow-200 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
            >
              Delegate votes
            </button>
          </div>

          <form onSubmit={handleVote} className="flex flex-col gap-3">
            <div className="flex justify-around gap-6 text-lg font-semibold text-orange-500">
              {proposals?.map(({name}, index) => (
                <div key={name}>
                  <input
                    onChange={formChangeHandler}
                    type="radio"
                    name="proposal"
                    id={name}
                    value={index}
                  />
                  <label htmlFor={name} className="ml-2">
                    {name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-6  items-center">
              <input
                onChange={formChangeHandler}
                type="number"
                min={1}
                max={+votingPower}
                name="amount"
                id="amount"
                placeholder="amount"
                className="text-lg text-center border-none  bg-slate-50  placeholder-black p-2"
              />
              <button
                type="submit"
                disabled={!isFormValid}
                // eslint-disable-next-line max-len
                className="disabled:bg-gray-300 bg-orange-400 px-28 hover:bg-gray-100 text-gray-800 font-semibold py-2 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
              >
                vote
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
