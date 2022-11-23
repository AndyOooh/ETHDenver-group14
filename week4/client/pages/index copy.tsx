import {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {Welcome} from '../components/Welcome';
import {Connected} from '../components/Connected';
import {HashLoader} from 'react-spinners';
import {Network} from '@ethersproject/providers';
// import {Network} from '@ethersproject/providers';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  // const [chainId, setChainId] = useState<number>();
  const [network, setNetwork] = useState<Network | undefined>();
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  console.log('🚀 ~ file: index.tsx ~ line 17 ~ network', network);

  const getAndSetNetwork = async (provider1: ethers.providers.Web3Provider): Promise<void> => {
    console.log('🚀 ~ file: index.tsx ~ line 21 ~ provider', provider1);
    try {
      const network = await provider1.getNetwork();
      console.log('🚀 ~ file: index.tsx ~ line 24 ~ network', network);
      setNetwork(network);
    } catch (error) {
      throw new Error(error);
    }
  };

  // const getNetwork = async (): Promise<Network | undefined> => {
  //   try {
  //     const network = await provider?.getNetwork();
  //     console.log('🚀 ~ file: index.tsx ~ line 26 ~ chainId', chainId);
  //     setNetwork(network);
  //     return network;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // useEffect(() => {
  //   provider?.on('network', (newNetwork, oldNetwork) => {
  //     console.log('🚀 ~ file: index.tsx ~ line 67 ~ newNetwork', newNetwork);
  //     getAndSetNetwork(provider);
  //     if (oldNetwork) {
  //       window.location.reload();
  //     }
  //   });
  //   return () => {
  //     // web3Provider remove listeners
  //   };
  // }, [provider]);

  useEffect(() => {
    if (!window.ethereum) return;
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      console.log('🚀 ~ file: index.tsx ~ line 46 ~ web3Provider', web3Provider);
      // web3Provider.on('accountWasChanged', (handleAccountChange)) // didnt make this work
      window.ethereum.on('accountsChanged', handleAccountChange); // Listening for account change/disconnect
      // window.ethereum.on('chainChanged', (chainId: string) => {
      //   console.log('🚀 ~ file: index.tsx ~ line 48 ~ chainId', chainId);
      //   // setChainId(+chainId);
      // });
      provider?.on('network', (newNetwork, oldNetwork) => {
        console.log('🚀 ~ file: index.tsx ~ line 67 ~ newNetwork', newNetwork);
        setIsLoading(true);
        // getAndSetNetwork(provider);
        if (oldNetwork) {
          window.location.reload();
        }
        setIsLoading(false);
      });
      setProvider(web3Provider);
      console.log('web3Provider._network*******', web3Provider._network);
      // setNetwork(web3Provider._network);
      // getAndSetNetwork(web3Provider);
      // setChainId(parseInt(window.ethereum.chainId));
    } catch (error) {
      throw new Error(error);
    }
    const connectionLocalStorage = localStorage.getItem('connection');
    if (connectionLocalStorage) {
      connectWallet();
    }
    setIsLoading(false);
    //  Clean up function to avoid memory leaks
    return () => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  const handleConnectMetamask = async (): Promise<void> => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('connectig...');
      const response = await connectWallet();
      console.log('🚀 ~ file: index.tsx ~ line 79 ~ response', response);
      response === 'ok' && localStorage.setItem('connection', 'metamask');
      // localStorage.setItem('connection', 'metamask'); // Should wait for connection to be confirmed
    } else {
      alert('Please install Metamask');
      return;
    }
  };

  const connectWallet = async (): Promise<string | void> => {
    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setConnectedAddress(accounts[0]);
      setIsLoading(false);
      return 'ok'; // TODO
    } catch (error) {
      // Handle any UI for errors here, e.g. network error, rejected request, etc.
      // Set state as needed
      setIsLoading(false);
      console.log('error', error);
      // throw new Error(error);
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

  const handleCreateDummy = async (): Promise<void> => {
    console.log('lala');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Tokenized ballot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center gap-1">
        <h1 className="text-7xl font-bold text-slate-50">Tokenized Ballot dApp</h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-6">Group 14 - Week 4</p>

        {isLoading ? (
          <HashLoader
            color="#FCD34D"
            loading={isLoading}
            // cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : network && network.chainId !== 5 ? (
          <div>Wrong chain!!!</div>
        ) : provider && connectedAddress && network ? (
          <Connected provider={provider} connectedAddress={connectedAddress} />
        ) : (
          // <div>Connected page placeholder</div>
          <Welcome createDummyWallet={handleCreateDummy} connectMetamask={handleConnectMetamask} />
        )}
      </main>
      {/* <footer className="flex h-24 w-full items-center justify-center"></footer> */}
    </div>
  );
};

export default Home;
