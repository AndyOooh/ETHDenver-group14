import {NextPage} from 'next';
import React from 'react';

export const DisconnectMessage: NextPage = () => {
  return (
    <div className="text-center">
      <p className="text-xl">To use this app you have to</p>
      <p className="text-3xl">
        connect your
        <span className="text-orange-400 "> metamask </span>
        wallet to
        <span className="text-orange-400"> goerli </span>
        testnet
      </p>
    </div>
  );
};
