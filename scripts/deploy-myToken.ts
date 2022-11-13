import 'dotenv/config';
import {ethers} from 'hardhat';
import {MyToken, MyToken__factory} from '../typechain-types';

export const deployMyToken = async (): Promise<void> => {
  // Should we pass in the network name and private keys as args?
  const {ALCHEMY_API_KEY} = process.env;
  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string; // getting linter issues if not assigning type.
  const networkName = process.argv[3];

  //   A lot of repeat code here. Maybe should refactor
  try {
    if (!ALCHEMY_API_KEY) {
      throw new Error('ALCHEMY_API_KEY missing');
    }
    let contractFactory: MyToken__factory;
    if (networkName === 'goerli') {
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      contractFactory = new MyToken__factory(signer);
    } else {
      console.log('in else of deployMyToken');
      const accounts = await ethers.getSigners();
      contractFactory = new MyToken__factory(accounts[0]);
    }
    const contract: MyToken = await contractFactory.deploy();
    await contract.deployed();
    console.log(
      `Contract MyToken deployed to: ${contract.address} on chainId: ${contract.deployTransaction.chainId} by: ${contract.deployTransaction.from}`,
    );
    // return contract.address;
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
