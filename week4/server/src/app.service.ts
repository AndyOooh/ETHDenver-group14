import {Injectable} from '@nestjs/common';
import {ethers} from 'ethers';

import * as tokenJson from '../assets/MyToken.json';
import {ERC20_ABI, ERC20_ADDRESS} from 'ER20Constants';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  erc20ContractFactory: ethers.ContractFactory;
  erc20Contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
    const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, this.provider);

    // this.provider = ethers.getDefaultProvider('goerli');
    // this.provider = ethers.getDefaultProvider('http://localhost:8545');
    // const signer = this.provider.getSigner();
    // const signer = ethers.Wallet.createRandom().connect(this.provider);
    this.erc20ContractFactory = new ethers.ContractFactory(
      tokenJson.abi,
      tokenJson.bytecode,
      signer
    );
    // this.erc20Contract = erc20ContractFactory.attach(erc20_contract_address);
    this.erc20Contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
  }

  getTokenAddress(): string {
    return ERC20_ADDRESS;
  }

  async requestTokens(toAddress: string, amount: string) {
    const amountWei = ethers.utils.parseEther(amount);
    try {
      const mintTx = await this.erc20Contract.mint(toAddress, amountWei);
      await mintTx.wait();
      console.log(`Minted ${amount} decimal units to account ${toAddress}`);
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
