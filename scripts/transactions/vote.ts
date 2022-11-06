import * as dotenv from "dotenv";
import {ethers} from "ethers";
import getBallotContract from "../utils/getBallotContract";

dotenv.config();

async function vote(contractAddress: string, proposalName: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  try {
    const tx = await ballot.vote(ethers.utils.formatBytes32String(proposalName));
    await tx.wait();
  } catch (err) {
    throw new Error(err as string);
  }
}

vote(process.argv[2], process.argv[3]);
