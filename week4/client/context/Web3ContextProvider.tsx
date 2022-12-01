import {ethers} from 'ethers';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react';

type Props = {
  children: ReactNode;
};

export type Web3ContextType = {
  provider: ethers.providers.Web3Provider | undefined;
  setProvider: (provider: ethers.providers.Web3Provider) => void;
  // setProvider: Dispatch<SetStateAction<ethers.providers.Web3Provider | undefined>>; // copy from hover. Also, works.
  connectedAddress: string;
  setConnectedAddress: (address: string) => void;
  chainId: number | null;
  setChainId: (chanId: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  connectMetamask: () => Promise<string | void>;
};

export const Web3Context = createContext({} as Web3ContextType); // using type assertion to avoid always checking for null
// export const Web3Context = createContext<Web3ContextType | null>(null); // also works.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Web3ContextProvider = ({children}: Props) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [connectedAddress, setConnectedAddress] = useState('');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initialize = async (): Promise<void> => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.on('chainChanged', handleChainChange);
    setProvider(web3Provider);
    setChainId(parseInt(window.ethereum.chainId));
  };

  useEffect(() => {
    console.log('in useEffect');
    if (!window.ethereum) return;
    initialize();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;
    initialize();
    if (localStorage.getItem('connection')) {
      connectMetamask();
    }
    setIsLoading(false);
    return (): void => {
      window.ethereum.removeAllListeners();
    };
  }, []);

  const connectMetamask = async (): Promise<string | void> => {
    try {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setConnectedAddress(accounts[0]);
      setIsLoading(false);
      return 'ok'; // TODO
    } catch (error) {
      console.log(error);
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

  const web3Context: Web3ContextType = useMemo(
    () => ({
      provider,
      setProvider,
      connectedAddress,
      setConnectedAddress,
      chainId,
      setChainId,
      isLoading,
      setIsLoading,
      connectMetamask
    }),
    [
      provider,
      setProvider,
      connectedAddress,
      setConnectedAddress,
      chainId,
      setChainId,
      isLoading,
      setIsLoading,
      connectMetamask
    ]
  );

  return <Web3Context.Provider value={web3Context}>{children}</Web3Context.Provider>;
};

// export default Web3ContextProvider
