import * as dotenv from "dotenv";
import {ethers} from "ethers";
import getBallotContract from "../utils/getBallotContract";

dotenv.config();

async function vote(contractAddress: string, proposalNumber: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  try {
    const tx = await ballot.vote(ethers.BigNumber.from(proposalNumber));
    await tx.wait();
  } catch (err) {
    throw new Error(err as string);
  }
}

vote(process.argv[2], process.argv[3]);
