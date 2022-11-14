import 'dotenv/config';
import getMyTokenContract from '../../utils/getMyTokenContract';

async function getVotes(contractAddress: string, atAddress: string): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);

  try {
    const getVotesTx = await myTokenContract.getVotes(atAddress);
    console.log(`${atAddress} has ${getVotesTx} votes`);
  } catch (err) {
    throw new Error(err as string);
  }
}

getVotes(process.argv[2], process.argv[3]);
