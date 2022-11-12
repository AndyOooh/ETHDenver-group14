import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getBallotContract from '../utils/getBallotContract';

dotenv.config();

async function getwinningProposal(contractAddress: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  try {
    const winningProposalIndex = await ballot.winningProposal();
    try {
      const winningProposalNameBytes32 = await ballot.winnerName();
      const winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes32);
      console.log(`The winner is ${winningProposalName} at index: ${winningProposalIndex}`);
    } catch (err) {
      throw new Error(err as string);
    }
  } catch (err) {
    throw new Error(err as string);
  }
}

getwinningProposal(process.argv[2]);
