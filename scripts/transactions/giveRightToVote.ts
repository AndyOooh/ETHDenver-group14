import {ethers} from 'ethers';
import {Ballot__factory} from './../../typechain-types/factories/Ballot__factory';
import * as dotenv from "dotenv";

dotenv.config();

async function giveRightToVote(contractAddress: string, voterAddress: string): Promise<void> {
  if (!process.env.GOERLI_PRIVATE_KEY) {
    throw new Error("GOERLI_PRIVATE_KEY not found");
  }

  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

  const ballotContractFactory = new Ballot__factory(signer);
  const ballot = ballotContractFactory.attach(contractAddress)

  try {
      const tx = await ballot.giveRightToVote(voterAddress)
      await tx.wait();
  } catch (err) {
    throw new Error(err as string)
  }
}

giveRightToVote(process.argv[2], process.argv[3]);
