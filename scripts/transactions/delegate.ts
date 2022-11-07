import * as dotenv from 'dotenv';
import getBallotContract from '../utils/getBallotContract';

dotenv.config();

async function delegate(contractAddress: string, delegateToAddress: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  try {
    const tx = await ballot.delegate(delegateToAddress);
    await tx.wait();
  } catch (err) {
    throw new Error(err as string);
  }
}

delegate(process.argv[2], process.argv[3]);
