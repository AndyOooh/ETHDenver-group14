import {NextPage} from 'next';
import Link from 'next/link';
import React, {useContext} from 'react';
import {Web3Context, Web3ContextType} from '../context/Web3ContextProvider';
import {Navbar} from './Navbar';

export const Header: NextPage = () => {
  const {connectMetamask, connectedAddress} = useContext(Web3Context) as Web3ContextType;
  const walletString = connectedAddress?.slice(0, 6) + '...' + connectedAddress?.slice(-4);
  const buttonText = connectedAddress ? walletString : 'Connect Wallet';
  return (
    <header className="header-grid w-full h-20 py-4 px-8 shadow-2xl ">
      <Link href="/">Home</Link>
      <Navbar />
      <button
        onClick={connectMetamask}
        disabled={false}
        className="whitespace-nowrap bg-orange-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
      >
        {buttonText}
      </button>
    </header>
  );
};
