import {ethers} from 'hardhat';
import {TokenizedBallot__factory} from '../typechain-types';
import {deployMyToken} from './deploy-myToken';

export const DeployTokenizedBallot = async (): Promise<void> => {
  const {ALCHEMY_API_KEY} = process.env;
  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string; // getting linter issues if not assigning type.
  const [networkName, ...constructorArgs] = process.argv.slice(3);

  if (!constructorArgs || constructorArgs.length === 0) {
    throw new Error('You need to pass a valid constructor argument');
  }
  const PROPOSALS_BYTES32 = constructorArgs.map(p => ethers.utils.formatBytes32String(p));

  try {
    let ContractFactory: TokenizedBallot__factory;
    if (networkName === 'goerli') {
      if (!ALCHEMY_API_KEY) {
        throw new Error('ALCHEMY_API_KEY missing');
      }
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      ContractFactory = new TokenizedBallot__factory(signer);
    } else {
      const accounts = await ethers.getSigners();
      ContractFactory = new TokenizedBallot__factory(accounts[0]);
    }
    const myTokenAddress = deployMyToken();
    const lastBlock = await ethers.provider.getBlock('latest');
    console.log(`Curent block number is ${lastBlock.number}`);
    const contract = await ContractFactory.deploy(
      PROPOSALS_BYTES32,
      myTokenAddress,
      lastBlock.number === 0 ? 0 : lastBlock.number - 1
    );
    await contract.deployed();
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
