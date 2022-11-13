import 'dotenv/config';
import {ethers} from 'hardhat';
import {TokenizedBallot__factory} from '../typechain-types';

export const DeployTokenizedBallot = async (): Promise<void> => {
  const {ALCHEMY_API_KEY} = process.env;
  const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string; // getting linter issues if not assigning type.
  const [networkName, myTokenAddress, ...proposals] = process.argv.slice(3);

  if (!proposals || proposals.length === 0) {
    throw new Error('You need to pass a valid constructor argument');
  }
  const PROPOSALS_BYTES32 = proposals.map(p => ethers.utils.formatBytes32String(p));

  try {
    let ContractFactory: TokenizedBallot__factory;
    let blockNumber: number;
    if (networkName === 'goerli') {
      if (!ALCHEMY_API_KEY) {
        throw new Error('ALCHEMY_API_KEY missing');
      }
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      ContractFactory = new TokenizedBallot__factory(signer);
      const lastBlock = await ethers.provider.getBlock('latest');
      blockNumber = lastBlock.number -1;
    } else {
      const accounts = await ethers.getSigners();
      ContractFactory = new TokenizedBallot__factory(accounts[0]);
      blockNumber = 0;
    }
    console.log('deploying TokenizedBallot contract...');
    const contract = await ContractFactory.deploy(
      PROPOSALS_BYTES32,
      myTokenAddress,
      blockNumber
    );
    await contract.deployed();
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
