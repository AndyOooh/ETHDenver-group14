import 'dotenv/config';
import {ethers} from 'ethers';
import {TokenizedBallot, TokenizedBallot__factory} from '../../typechain-types';

function getTokenizedBallotContract(contractAddress: string): TokenizedBallot {
  if (!process.env.GOERLI_PRIVATE_KEY) {
    throw new Error('GOERLI_PRIVATE_KEY not found');
  }

  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

  const tokenizedBallotContractFactory = new TokenizedBallot__factory(signer);
  const tokenizedBallotContract = tokenizedBallotContractFactory.attach(contractAddress);

  return tokenizedBallotContract;
}

export default getTokenizedBallotContract;
