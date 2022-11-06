import {ethers} from 'ethers';
import {Ballot__factory} from './../../typechain-types/factories/Ballot__factory';
import * as dotenv from "dotenv";
import {Ballot} from '../../typechain-types';

dotenv.config();

function getBallotContract(contractAddress: string): Ballot {
  if (!process.env.GOERLI_PRIVATE_KEY) {
    throw new Error("GOERLI_PRIVATE_KEY not found");
  }

  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

  const ballotContractFactory = new Ballot__factory(signer);
  const ballot = ballotContractFactory.attach(contractAddress)

  return ballot
}

export default getBallotContract
