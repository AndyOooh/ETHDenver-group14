import 'dotenv/config';
import { ethers } from 'hardhat';
import getTokenizedBallotContract from '../../utils/getTokenizedBallotContract';

async function vote(contractAddress: string, proposal: string, amount: string): Promise<void> {
  const tokenizedBallotContract = getTokenizedBallotContract(contractAddress);

  const amountToEth = ethers.utils.parseEther(amount);

  try {
    const voteTx = await tokenizedBallotContract.vote(proposal, amountToEth);
    console.log(`${voteTx.from} used ${+amountToEth / 1e18} voting power to vote for proposal ${proposal}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

vote(process.argv[2], process.argv[3], process.argv[4]);
