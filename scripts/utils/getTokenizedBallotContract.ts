import 'dotenv/config';
import {ethers} from 'ethers';
import {TokenizedBallot, TokenizedBallot__factory} from '../../typechain-types';

function getTokenizedBallotContract(contractAddress: string): TokenizedBallot {
  if (!process.env.METAMASK_PK) {
    throw new Error('METAMASK_PK not found');
  }

  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_PK, provider);

  const tokenizedBallotContractFactory = new TokenizedBallot__factory(signer);
  const tokenizedBallotContract = tokenizedBallotContractFactory.attach(contractAddress);

  return tokenizedBallotContract;
}

export default getTokenizedBallotContract;
