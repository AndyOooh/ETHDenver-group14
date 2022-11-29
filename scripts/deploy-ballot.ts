import {ethers} from 'hardhat';
import {Ballot__factory} from '../typechain-types';
import 'dotenv/config';

// deploy function
export const deployBallot = async (): Promise<void> => {
  const {ALCHEMY_API_KEY} = process.env;
  const METAMASK_PK = process.env.METAMASK_PK as string; // getting linter issues if not assigning type.
  const [networkName, ...constructorArgs] = process.argv.slice(3);
  if (!ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY missing');
  }
  if (!constructorArgs || constructorArgs.length === 0) {
    throw new Error('You need to pass a valid constructor argument');
  }
  const PROPOSALS_BYTES32 = constructorArgs.map(p => ethers.utils.formatBytes32String(p));
  try {
    let ContractFactory: Ballot__factory;
    if (networkName === 'goerli') {
      // deploy to goerli
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(METAMASK_PK, provider);
      const signer = wallet.connect(provider);
      ContractFactory = new Ballot__factory(signer);
    } else {
      // deploy to hardhat.
      // NB: preferably this will be changed to deploy to localhost.
      const accounts = await ethers.getSigners();
      ContractFactory = new Ballot__factory(accounts[0]);
    }
    const contract = await ContractFactory.deploy(PROPOSALS_BYTES32);
    await contract.deployed();
    // This is only for logging the proposals to the console.
    const proposals = [];
    for (let index = 0; index < constructorArgs.length; index++) {
      const proposal = await contract.proposals(index);
      proposals.push(proposal);
    }
    // eslint-disable-next-line no-console
    console.log(`Contract Ballot deployed to: ${contract.address} on chainId: ${
      contract.deployTransaction.chainId
    }
    with proposals: ${proposals.map(p => ethers.utils.parseBytes32String(p.name))}`);
  } catch (error) {
    throw new Error(error as string);
    process.exitCode = 1;
  }
};
