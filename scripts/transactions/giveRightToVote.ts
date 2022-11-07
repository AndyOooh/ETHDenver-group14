import * as dotenv from "dotenv";
import getBallotContract from "../utils/getBallotContract";

dotenv.config();

async function giveRightToVote(
  contractAddress: string,
  voterAddress: string
): Promise<void> {
  const ballot = getBallotContract(contractAddress);

  try {
    const tx = await ballot.giveRightToVote(voterAddress);
    await tx.wait();
  } catch (err) {
    throw new Error(err as string);
  }
}

giveRightToVote(process.argv[2], process.argv[3]);
