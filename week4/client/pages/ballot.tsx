import React, {useContext, useEffect, useState} from 'react';
import {BigNumber, ethers} from 'ethers';
import {NextPage} from 'next';
import {HashLoader} from 'react-spinners';
import {api} from '../api/axios.config';

import {Header} from '../components/Header';
import Main from '../components/Main';
import {Web3Context, Web3ContextType} from '../context/Web3ContextProvider';

type VoteData = {
  proposal: string;
  amount: number;
};

type Proposal = {
  name: string;
  voteCount: number;
};

const Ballot: NextPage = () => {
  const {provider, connectedAddress} = useContext(Web3Context) as Web3ContextType;
  const [myTokenContract, setMyTokenContract] = useState<ethers.Contract | null>(null);
  const [ballotContract, setBallotContract] = useState<ethers.Contract | null>(null);
  const [balanceWEEK4, setBalanceWEEK4] = useState<number | null>(null);
  const [balanceETH, setBalanceETH] = useState<number | null>(null);
  const [votingPower, setVotingPower] = useState<number>(0);
  const [status, setStatus] = useState<
    'loading' | 'idle' | 'requestingTokens' | 'delegatingVotes' | 'voting'
  >('loading');
  const [voteData, setVoteData] = useState<VoteData | null>({proposal: '', amount: 1});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal[] | null>(null);

  useEffect(() => {
    connectedAddress ? initialize() : null;
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
      const {data} = await api.get('/contract-data/Ballot');
      const [myTokenData, ballotData] = data;
      const signer = provider?.getSigner(connectedAddress);
      const _MyTokenContract = new ethers.Contract(myTokenData.address, myTokenData.abi, signer);
      setMyTokenContract(_MyTokenContract);
      const _WEEK4Balance = await _MyTokenContract.balanceOf(connectedAddress);
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
      console.log(error);
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
  return (
    <>
      <Header />
      <Main>
        <h1 className="text-7xl font-bold text-slate-50">Tokenized Ballot dApp</h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-3">Group 14 - Week 4</p>
        {status === 'loading' ? (
          <HashLoader color="#FCD34D" size={60} aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <>
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
                  {status === 'voting'
                    ? ' Placing your votes'
                    : ' Minting 2 WEEK4 tokens to your wallet'}
                  . This could take up to a minute depending on network activity...
                </p>
                <HashLoader
                  color="#FB923C"
                  size={60}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
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
                      placeholder="1"
                      // eslint-disable-next-line max-len
                      className=" text-white  
                placeholder-white
                
                even-inner-shadow  
                 rounded-md border-solid text-lg text-center  bg-white bg-opacity-25 p-2"
                    />
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      // eslint-disable-next-line max-len
                      className=" even-shadow disabled:bg-gray-300 bg-orange-400 px-28 hover:bg-gray-100 text-gray-800 font-semibold py-2 border rounded-xl shadow-lg shadow-zinc-800"
                    >
                      vote
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </Main>
    </>
  );
};

export default Ballot;
