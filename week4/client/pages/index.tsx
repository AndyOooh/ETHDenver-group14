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
        <Main title="ETHDenver boot camp by Encode" subtitle="Group 14"></Main>
    </>
  );
};

export default Home;
