import {NextPage} from 'next';
import React from 'react';
import {Header} from '../components/Header';
import Main from '../components/Main';

const Lottery: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <h1 className="text-7xl font-bold text-slate-50">Lottery dApp</h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-3">Group 14 - Week 5</p>
      </Main>
    </>
  );
};

export default Lottery;
