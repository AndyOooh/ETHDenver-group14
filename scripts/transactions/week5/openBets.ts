import 'dotenv/config';
import {ethers} from 'hardhat';
import {Lottery__factory} from '../../../typechain-types';

// duration in in seconds
async function openBets(duration: string): Promise<void> {
  if (!process.env.METAMASK_PK) {
    throw new Error('METAMASK_PK not found');
  }
  const lotteryContractAddress = '0x5f539341E79732B32C1dBC9dab6F04C309b60995';
  const currentBlock = await ethers.provider.getBlock('latest');
  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_PK, provider);
  const lotteryContractFactory = new Lottery__factory(signer);
  const lotteryContract = lotteryContractFactory.attach(lotteryContractAddress);

  try {
    console.log('opening lottery for bets... is the previous lottery closed?');
    const closingTime = currentBlock.timestamp + Number(duration);
    const openBetsTx = await lotteryContract.openBets(closingTime);
    await openBetsTx.wait();
    console.log(`openBets tx hash: ${openBetsTx.hash}`);
  } catch (err) {
    throw new Error(err as string);
  }
}

openBets(process.argv[2]);
