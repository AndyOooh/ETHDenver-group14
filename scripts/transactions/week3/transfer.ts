import 'dotenv/config';
import {ethers} from 'hardhat';
import getMyTokenContract from '../../utils/getMyTokenContract';

async function delegate(
  contractAddress: string,
  transferToAddress: string,
  amount: string,
): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);
//   const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
//   const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);
  const amountWei = ethers.utils.parseEther(amount);

  try {
    const transferTx = await myTokenContract.transfer(transferToAddress, amountWei);
    await transferTx.wait();
    console.log(`Delegate tx hash: ${transferTx.hash}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

delegate(process.argv[2], process.argv[3], process.argv[4]);