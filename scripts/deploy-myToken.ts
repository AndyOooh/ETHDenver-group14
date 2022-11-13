import 'dotenv/config';
import {ethers} from 'hardhat';
import {MyToken, MyToken__factory} from '../typechain-types';

console.log('in ERC20Votes.ts');

export const deployMyToken = async (): Promise<string> => {
  // Should we pass in the network name and private keys as args?
  const {ALCHEMY_API_KEY} = process.env;
  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string; // getting linter issues if not assigning type.
  const [networkName] = process.argv[3];

  if (!ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY missing');
  }

  //   A lot of repeat code here. Maybe should refactor
  try {
    let contractFactory: MyToken__factory;
    if (networkName === 'goerli') {
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      contractFactory = new MyToken__factory(signer);
    } else {
      console.log('in else of deploy_ERC20VOtes');
      const accounts = await ethers.getSigners();
      contractFactory = new MyToken__factory(accounts[0]);
    }
    const contract: MyToken = await contractFactory.deploy();
    await contract.deployed();
    return contract.address;
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
