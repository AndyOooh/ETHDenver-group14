import {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {Welcome} from '../components/Welcome';
import {HashLoader} from 'react-spinners';
import {Connected} from '../components/Connected';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [chainId, setChainId] = useState<number>();
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!window.ethereum) return;
    initialize();
    if (localStorage.getItem('connection')) {
      connectWallet();
    }
    setIsLoading(false);
    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  const initialize = async (): Promise<void> => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.on('chainChanged', handleChainChange);
    setProvider(web3Provider);
    setChainId(parseInt(window.ethereum.chainId));
  };

  const connectWallet = async (): Promise<string | void> => {
    try {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setConnectedAddress(accounts[0]);
      setIsLoading(false);
      return 'ok'; // TODO
    } catch (error) {
      console.log(error);
    }
  };

  const handleConnectMetamask = async (): Promise<void> => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      // replace with button to install metamask
      alert('Please install Metamask');
      return;
    } else {
      const response = await connectWallet();
      response === 'ok' && localStorage.setItem('connection', 'metamask');
    }
  };

  const handleAccountChange = (accounts: string[]): void => {
    if (accounts.length === 0) {
      console.log('no accounts found, clearing localStorage');
      localStorage.removeItem('connection');
      window.location.reload();
    } else {
      setConnectedAddress(accounts[0]);
      console.log('accountWasChanged');
    }
  };

  const handleChainChange = (): void => {
    console.log('chain was changed');
    window.location.reload();
  };

  const handleCreateDummy = async (): Promise<void> => {
    console.log('Link to metamask set up');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Tokenized ballot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center gap-1">
        <h1 className="text-7xl font-bold text-slate-50">Tokenized Ballot dApp</h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-3">Group 14 - Week 4</p>

        {isLoading ? (
          <HashLoader
            color="#FCD34D"
            loading={isLoading}
            // cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : chainId && chainId !== 5 ? (
          <>
            <h2 className="text-4xl font-light text-white">
              You need to be on Goerli network to use this app. Change network?
            </h2>
            <button
              // onClick={(): void => handleChainChange('5')}
              className="mt-6 bg-orange-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
            >
              Connect to Goerli
            </button>
          </>
        ) : chainId && connectedAddress ? (
          <Connected provider={provider} connectedAddress={connectedAddress} />
        ) : (
          <Welcome createDummyWallet={handleCreateDummy} connectMetamask={handleConnectMetamask} />
        )}
      </main>
      {/* <footer className="flex h-24 w-full items-center justify-center"></footer> */}
    </div>
  );
};

export default Home;
