import {NextPage} from 'next';
import Head from 'next/head';

import {Header} from '../components/Header';
import Main from '../components/Main';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Group 14</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main>
        <h1 className="text-7xl font-bold text-slate-50">ETHDenver boot camp by Encode</h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-3">Group 14</p>
      </Main>
    </>
  );
};

export default Home;
