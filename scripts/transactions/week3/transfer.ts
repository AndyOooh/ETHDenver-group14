import 'dotenv/config';
import {ethers} from 'hardhat';
import getMyTokenContract from '../../utils/getMyTokenContract';

async function transfer(
  contractAddress: string,
  toAddress: string,
  amount: string,
): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);
  const amountWei = ethers.utils.parseEther(amount);

  try {
    const transferTx = await myTokenContract.transfer(toAddress, amountWei);
    await transferTx.wait();
    console.log(`${amount} tokens transferred to ${toAddress}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

transfer(process.argv[2], process.argv[3], process.argv[4]);