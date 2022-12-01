import 'dotenv/config';
import getTokenizedBallotContract from '../../utils/getTokenizedBallotContract';

async function getVotingPower(contractAddress: string, atAddress: string): Promise<void> {
  const tokenizedBallotContract = getTokenizedBallotContract(contractAddress);

  try {
    const getVotingPowerTx = await tokenizedBallotContract.votingpower(atAddress);
    console.log(`${atAddress} has ${getVotingPowerTx} voting power`);
  } catch (err) {
    throw new Error(err as string);
  }
}

getVotingPower(process.argv[2], process.argv[3]);
