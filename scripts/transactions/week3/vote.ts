import 'dotenv/config';
import getTokenizedBallotContract from '../../utils/getTokenizedBallotContract';

async function vote(contractAddress: string, proposal: string, amount: string): Promise<void> {
  const tokenizedBallotContract = getTokenizedBallotContract(contractAddress);
  console.log('🚀 ~ file: vote.ts ~ line 5 ~ proposal', proposal, typeof proposal)

  try {
    const voteTx = await tokenizedBallotContract.vote(proposal, amount);
    console.log('🚀 ~ file: vote.ts ~ line 9 ~ voteTx', voteTx);
    console.log(`${voteTx.from} used ${amount} voting power to vote for proposal ${proposal}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

vote(process.argv[2], process.argv[3], process.argv[4]);
