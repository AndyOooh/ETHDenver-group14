import {ethers} from 'ethers';
import * as dotenv from 'dotenv';
import {Ballot, Ballot__factory} from '../../typechain-types';

dotenv.config();

function getBallotContract(contractAddress: string): Ballot {
  if (!process.env.METAMASK_PK) {
    throw new Error('METAMASK_PK not found');
  }

  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_PK, provider);

  const ballotContractFactory = new Ballot__factory(signer);
  const ballot = ballotContractFactory.attach(contractAddress);

  return ballot;
}

export default getBallotContract;
