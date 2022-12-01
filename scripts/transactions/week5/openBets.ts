import 'dotenv/config';
import {ethers} from 'hardhat';
import {Lottery__factory} from '../../../typechain-types';

// duration in in seconds
async function openBets(duration: string): Promise<void> {
  if (!process.env.METAMASK_PK) {
    throw new Error('METAMASK_PK not found');
  }
  const lotteryContractAddress = '0x327FCcAe517242Dc83650Fd94d038AA9E533F4E8';
  const currentBlock = await ethers.provider.getBlock('latest');
  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_PK, provider);
  const lotteryContractFactory = new Lottery__factory(signer);
  const lotteryContract = lotteryContractFactory.attach(lotteryContractAddress);
  console.log('🚀  file: openBets.ts:16  lotteryContract', lotteryContract)

  try {
    console.log('GONNE TRY TO OPEN THE BETS');
    // const closingTime = currentBlock.timestamp + parseInt(duration);
    const closingTime = currentBlock.timestamp + Number(duration);
    console.log('🚀  file: openBets.ts:20  closingTime', closingTime)
    // const openBetsTx = await lotteryContract.openBets(currentBlock.timestamp + Number(duration));
    const openBetsTx = await lotteryContract.openBets(closingTime);
    await openBetsTx.wait();
    console.log(`openBets tx hash: ${openBetsTx.hash}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

openBets(process.argv[2]);
