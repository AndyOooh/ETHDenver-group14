import 'dotenv/config';
import {ethers} from 'ethers';
import {MyToken} from '../../typechain-types/contracts/MyToken';
import {MyToken__factory} from '../../typechain-types/factories/contracts/MyToken__factory';

function getMyTokenContract(contractAddress: string): MyToken {
  if (!process.env.METAMASK_PK) {
    throw new Error('METAMASK_PK not found');
  }

  const provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
  const signer = new ethers.Wallet(process.env.METAMASK_PK, provider);

  const myTokenContractFactory = new MyToken__factory(signer);
  const myTokenContract = myTokenContractFactory.attach(contractAddress);

  return myTokenContract;
}

export default getMyTokenContract;
