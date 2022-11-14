import 'dotenv/config';
import {ethers} from 'hardhat';
import {TokenizedBallot__factory} from '../typechain-types';

export const deployTokenizedBallot = async (): Promise<void> => {
  if (typeof process.env.GOERLI_PRIVATE_KEY !== 'string') return;
  const {ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY} = process.env;
  // const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string; // getting linter issues if not assigning type.
  const [networkName, myTokenAddress, ...proposals] = process.argv.slice(3);
  console.log('🚀 ~ file: deploy-tokenizedBallot.ts ~ line 10 ~ proposals', proposals);
  console.log('🚀 ~ file: deploy-tokenizedBallot.ts ~ line 10 ~ myTokenAddress', myTokenAddress);
  console.log('🚀 ~ file: deploy-tokenizedBallot.ts ~ line 10 ~ networkName', networkName);

  if (!proposals || proposals.length === 0) {
    throw new Error('You need to pass a valid constructor argument');
  }
  const PROPOSALS_BYTES32 = proposals.map(p => ethers.utils.formatBytes32String(p));

  try {
    let ContractFactory: TokenizedBallot__factory;
    let targetBlockNumber: number;
    if (networkName === 'goerli') {
      if (!ALCHEMY_API_KEY) {
        throw new Error('ALCHEMY_API_KEY missing');
      }
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(GOERLI_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      ContractFactory = new TokenizedBallot__factory(signer);
      const lastBlock = await provider.getBlock('latest');
      console.log('🚀 ~ file: deploy-tokenizedBallot.ts ~ line 28 ~ lastBlock', lastBlock);
      targetBlockNumber = lastBlock.number - 1; // set this is argument instead? use a blocknumber 12 hours in the future?
    } else if (networkName === 'localhost' || networkName === 'hardhat') {
      console.log('in network == localhost');
      const accounts = await ethers.getSigners();
      ContractFactory = new TokenizedBallot__factory(accounts[0]);
      targetBlockNumber = 0;
    } else if (networkName === 'mainnet') {
      throw new Error('Mainnet not implemented');
    } else {
      throw new Error('Invalid network name');
    }
    console.log(`deploying TokenizedBallot contract on network: ${networkName}`);
    const contract = await ContractFactory.deploy(
      PROPOSALS_BYTES32,
      myTokenAddress,
      targetBlockNumber
    );
    await contract.deployed();

    console.log(`Contract TokenizedBallot deployed to: ${contract.address} on chainId: ${
      contract.deployTransaction.chainId
    }
    with proposals: ${proposals.map(p => p)}`);
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
