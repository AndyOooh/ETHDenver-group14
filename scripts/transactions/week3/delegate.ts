import 'dotenv/config';
import {ethers} from 'hardhat';
import getMyTokenContract from '../../utils/getMyTokenContract';

async function delegate(
  contractAddress: string,
): Promise<void> {
  const myTokenContract = getMyTokenContract(contractAddress);
  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

  try {
    const delegateTx = await myTokenContract.delegate(signer.address);
    await delegateTx.wait();
    console.log(`Delegate tx hash: ${delegateTx.hash}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

delegate(process.argv[2]);
