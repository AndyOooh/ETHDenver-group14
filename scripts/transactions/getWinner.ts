import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getBallotContract from '../utils/getBallotContract';

dotenv.config();

async function getwinningProposal(contractAddress: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  let winningProposalVoteCount;
  let winningProposalName;
  try {
    winningProposalVoteCount = await ballot.winningProposal();
  } catch (err) {
    throw new Error(err as string);
  }
  try {
    const winningProposalNameBytes32 = await ballot.winnerName();
    winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes32);
  } catch (err) {
    throw new Error(err as string);
  }
  console.log(`The winner is ${winningProposalName} with ${winningProposalVoteCount} votes`);
}

getwinningProposal(process.argv[2]);
