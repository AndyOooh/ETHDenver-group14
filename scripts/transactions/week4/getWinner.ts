import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getTokenizedBallotContract from '../../utils/getTokenizedBallotContract';

dotenv.config();

async function getWinner(contractAddress: string): Promise<void> {
  const tokenizedBallot = getTokenizedBallotContract(contractAddress);
  try {
    const winningProposalIndex = await tokenizedBallot.winningProposal();
    try {
      const winningProposalNameBytes32 = await tokenizedBallot.winnerName();
      const winningProposalName = ethers.utils.parseBytes32String(winningProposalNameBytes32);
      console.log(`The winner is ${winningProposalName} at index: ${winningProposalIndex}`);
    } catch (err) {
      throw new Error(err as string);
    }
  } catch (err) {
    throw new Error(err as string);
  }
}

getWinner(process.argv[2]);
