import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getBallotContract from '../utils/getBallotContract';

dotenv.config();

async function getwinningProposal(contractAddress: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  try {
    const winningProposalVoteCount = await ballot.winningProposal();
    const winningProposalName = await ballot.winnerName();
    const winningProposalNameToString = ethers.utils.parseBytes32String(winningProposalName);

    console.log(
      `The winner is ${winningProposalNameToString} with ${winningProposalVoteCount} votes`
    );
  } catch (err) {
    throw new Error(err as string);
  }
}

getwinningProposal(process.argv[2]);
