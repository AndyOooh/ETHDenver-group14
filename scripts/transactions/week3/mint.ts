import 'dotenv/config';
import {ethers} from 'hardhat';
import getMyTokenContract from '../../utils/getMyTokenContract';

async function mint(
  contractAddress: string,
  mintToAddress: string,
  amount: string
): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);
  const amountWei = ethers.utils.parseEther(amount);

  try {
    const mintTx = await myTokenContract.mint(mintToAddress, amountWei);
    await mintTx.wait();
    console.log(`Minted ${amount} decimal units to account ${mintToAddress}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

mint(process.argv[2], process.argv[3], process.argv[4]);
