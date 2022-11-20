import {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {Welcome} from '../components/Welcome';
import {Connected} from '../components/Connected';

// TODO listen for disconnect event and remove from LS.

const Home: NextPage = () => {
  const [walletConnection, setWalletConnection] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [connectedAddress, setConnectedAddress] = useState('');
  console.log('🚀 ~ file: index.tsx ~ line 12 ~ provider', provider)

  // Move to <Connected /> component
  const walletString = connectedAddress?.slice(0, 6) + '...' + connectedAddress?.slice(-4);
  // Move to <Connected /> component

  useEffect(() => {
    const connect = async (): Promise<void> => {
      //  This is not ideal. Check ls then check ethereum? Logic doesn't add up.
      const connection = localStorage.getItem('connection');
      setWalletConnection(connection);
      if (typeof window?.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const accounts: string[] = await provider.listAccounts();
        setConnectedAddress(accounts[0]);
        console.log('🚀 ~ file: index.tsx ~ line 23 ~ accounts', accounts);
        const signer = provider.getSigner(0);
        console.log('🚀 ~ file: index.tsx ~ line 23 ~ signer', signer);
        setProvider(provider);
      }
    };
    connect();
  }, []);

  const handleCreateDummy = async (): Promise<void> => {
    console.log('lala');
  };

  const handleConnectMetamask = async (): Promise<void> => {
    if (!window?.ethereum) {
      alert('Please install Metamask');
      return;
    } else {
      const response = await ethereum.request({method: 'eth_requestAccounts'});
      if (response.length === 1) {
        localStorage.setItem('connection', 'metamask');
        setWalletConnection('metamask');
      }
      console.log('🚀 ~ file: index.tsx ~ line 31 ~ response', response);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Tokenized ballot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Move to <Connected />> */}
      <p className="text-lg text-yellow-400">
        {walletConnection
          ? `Connected to ${walletConnection} with ${walletString} on ${provider?._network?.name}`
          : 'Not connected'}
      </p>
      {/* Move to <Connected />> */}

      {walletConnection ? (
        <Connected />
      ) : (
        <Welcome createDummyWallet={handleCreateDummy} connectMetamask={handleConnectMetamask} />
      )}

      <footer className="flex h-24 w-full items-center justify-center"></footer>
    </div>
  );
};

export default Home;
