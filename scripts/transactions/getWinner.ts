import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getBallotContract from '../utils/getBallotContract';

dotenv.config();

async function getwinningProposal(contractAddress: string): Promise<void> {
  const ballot = getBallotContract(contractAddress);
  let winningProposalIndex;
  let winningProposalName;
  try {
    winningProposalIndex = await ballot.winningProposal();
  } catch (err) {
    throw new Error(err as string);
  }
  try {
    const winningProposalNameBytes32 = await ballot.winnerName();
    winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes32);
  } catch (err) {
    throw new Error(err as string);
  }
  console.log(`The winner is ${winningProposalName} at index: ${winningProposalIndex}`);
}

getwinningProposal(process.argv[2]);
