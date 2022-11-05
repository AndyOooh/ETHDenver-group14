import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Ballot, Ballot__factory } from '../typechain-types';

const PROPOSALS = ['lemon', 'apple', 'banana'];

const PROPOSALS_BYTES32 = PROPOSALS.map(p => ethers.utils.formatBytes32String(p));

describe('Ballot', async () => {
  let ballotContract: Ballot;
  let accounts: SignerWithAddress[];

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    const ballotFactory = await ethers.getContractFactory('Ballot');
    ballotContract = await ballotFactory.deploy(PROPOSALS_BYTES32); //awaiting tx being sent
    await ballotContract.deployed(); // awaiting deployment
  });

  describe('when the contract is deployed', () => {
    it('has the provided proposals', async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        // loop over PROPOSALs array
        const proposal = await ballotContract.proposals(index); // get the proposal at index from contract
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[index]); // compare the proposal name with the one in the array
      }
    });
    it('has zero votes for all proposals', async function () {
      // TODO
      throw Error('Not implemented');
    });
    it('sets the deployer as the chairman', async () => {
      const chairperson = await ballotContract.chairperson();
      expect(chairperson).to.eq(accounts[0].address);
    });
    it('Sets the voting weight fir the chairperson as 1', async () => {
      // TODO
      throw Error('Not implemented');
    });
  });
  describe('When the chairperson interacts with the giveRightToVote function in the contract', () => {
    beforeEach(async () => {
      const selectedVoter = accounts[1].address;
      const tx = await ballotContract.giveRightToVote(selectedVoter);
      await tx.wait();
    });
    it('gives right to vote for another addres', async () => {
      const acc1Voter = await ballotContract.voters(accounts[1].address);
      expect(acc1Voter.weight).to.eq(1);
      // TODO
      throw Error('Not implemented');
    });
    it('can not give right to vote for someone that has already voted', async () => {
      // TODO
      throw Error('Not implemented');
    });
    it('can not give voting right to someone who already has voting right', async () => {
      // const selectedVoter = accounts[1].address;
      // await expect(ballotContract.giveRightToVote(selectedVoter)).to.be.revertedWithoutReason();
      // TODO
      throw Error('Not implemented');
    });
  });

  // DID NOT FINISH THIS IN CLASS
  describe('when the voter interact with the vote function in the contract', function () {
    // TODO
    it('should register the vote', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when the voter interact with the delegate function in the contract', function () {
    // TODO
    it('should transfer voting power', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when the an attacker interact with the giveRightToVote function in the contract', function () {
    // TODO
    it('should revert', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when the an attacker interact with the vote function in the contract', function () {
    // TODO
    it('should revert', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when the an attacker interact with the delegate function in the contract', function () {
    // TODO
    it('should revert', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when someone interact with the winningProposal function before any votes are cast', function () {
    // TODO
    it('should return 0', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when someone interact with the winningProposal function after one vote is cast for the first proposal', function () {
    // TODO
    it('should return 0', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when someone interact with the winnerName function before any votes are cast', function () {
    // TODO
    it('should return name of proposal 0', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when someone interact with the winnerName function after one vote is cast for the first proposal', function () {
    // TODO
    it('should return name of proposal 0', async () => {
      throw Error('Not implemented');
    });
  });

  describe('when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals', function () {
    // TODO
    it('should return the name of the winner proposal', async () => {
      throw Error('Not implemented');
    });
  });
});
