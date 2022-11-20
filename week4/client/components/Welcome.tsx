import {NextPage} from 'next';

type WelcomeProps = {
  createDummyWallet: () => Promise<void>;
  connectMetamask: () => Promise<void>;
};

// export const Welcome: NextPage<WelcomeProps> = (props) => {
export const Welcome: NextPage<WelcomeProps> = ({createDummyWallet, connectMetamask}) => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center gap-1">
      <h1 className="text-7xl font-bold text-slate-50">Tokenized Ballot dApp</h1>
      <p className="text-2xl font-semibold text-yellow-200">Group 14 - Week 4</p>
      <h2 className="text-4xl font-light text-white mt-6">Choose your connection method</h2>

      <div
        id="buttons"
        className="h-40 min-w-lg max-w-lg grid grid-flow-row gap-6 mt-5 text-xl whitespace-nowrap sm:h-16 sm:grid-flow-col sm:grid-cols-2 "
      >
        <button
          onClick={createDummyWallet}
          disabled={false}
          className=" bg-amber-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
        >
          Dummy Wallet
        </button>
        <button
          onClick={connectMetamask}
          disabled={false}
          className="bg-orange-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
        >
          Metamask
        </button>
      </div>
    </main>
  );
};
