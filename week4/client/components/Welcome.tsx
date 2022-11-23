import {NextPage} from 'next';

type WelcomeProps = {
  createDummyWallet: () => Promise<void>;
  connectMetamask: () => Promise<void>;
};

// export const Welcome: NextPage<WelcomeProps> = (props) => {
export const Welcome: NextPage<WelcomeProps> = ({createDummyWallet, connectMetamask}) => {
  return (
    <>
      <h2 className="text-4xl font-light text-white">Choose your connection method</h2>
      <div
        id="buttons"
        className="h-40 min-w-lg max-w-lg grid grid-flow-row gap-6 mt-5 text-xl whitespace-nowrap sm:h-16 sm:grid-flow-col sm:grid-cols-2 "
      >
        <button
          onClick={createDummyWallet}
          disabled={false}
          className=" bg-amber-300 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
        >
          Localhost
        </button>
        <button
          onClick={connectMetamask}
          disabled={false}
          className="bg-orange-400 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow-lg shadow-zinc-800"
        >
          Metamask
        </button>
      </div>
    </>
  );
};
