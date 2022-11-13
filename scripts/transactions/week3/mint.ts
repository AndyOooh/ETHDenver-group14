import * as dotenv from 'dotenv';
import {ethers} from 'hardhat';
import getMyTokenContract from '../../utils/getMyTokenContract';

dotenv.config();

async function mint(
  contractAddress: string,
  mintToToAddress: string,
  amount: string
): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);
  const amountWei = ethers.utils.parseEther(amount);

  try {
    const mintTx = await myTokenContract.mint(mintToToAddress, amountWei);
    await mintTx.wait();
    console.log(`Minted ${amount} decimal units to account ${mintToToAddress}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

mint(process.argv[2], process.argv[3], process.argv[4]);
