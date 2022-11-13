import 'dotenv/config';
import {ethers} from 'ethers';
import {MyToken} from '../../typechain-types/contracts/MyToken';
import {MyToken__factory} from '../../typechain-types/factories/contracts/MyToken__factory';

function getMyTokenContract(contractAddress: string): MyToken {
  if (!process.env.GOERLI_PRIVATE_KEY) {
    throw new Error('GOERLI_PRIVATE_KEY not found');
  }

  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

  const myTokenContractFactory = new MyToken__factory(signer);
  const myTokenContract = myTokenContractFactory.attach(contractAddress);

  return myTokenContract;
}

export default getMyTokenContract;
