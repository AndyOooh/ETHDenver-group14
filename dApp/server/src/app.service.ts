import {Injectable} from '@nestjs/common';
import {ethers} from 'ethers';

import * as tokenJson from 'src/assets/week4/MyToken.json';
import {erc20Data} from 'src/assets/week4/ER20Constants';
import {tokenBallotData} from 'src/assets/week4/tokenBallotConstants';
import {lotteryData} from 'src/assets/week5/lotteryConstants';
import { LOTData } from 'src/assets/week5/LOTConstants';

@Injectable()
export class AppService {
  provider: ethers.providers.BaseProvider;
  erc20ContractFactory: ethers.ContractFactory;
  erc20Contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.AlchemyProvider('goerli', process.env.ALCHEMY_API_KEY);
    const signer = new ethers.Wallet(process.env.METAMASK_PK, this.provider);

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
    this.erc20Contract = new ethers.Contract(erc20Data.address, erc20Data.abi, signer);
  }

  // Global/util
  getContractsData(contractName: string) {
    if (contractName === 'Ballot') {
      return [erc20Data, tokenBallotData];
    } else if (contractName === 'Lottery') {
      return [lotteryData, LOTData];
    }
  }

  // Week 4
  async requestWEEK4(toAddress: string) {
    // hardcoded to 2 ether
    const amount = '2';
    const amountWei = ethers.utils.parseEther(amount);
    console.log('Requesting to mint...');
    try {
      const mintTx = await this.erc20Contract.mint(toAddress, amountWei);
      await mintTx.wait();
      console.log('🚀 ~ file: app.service.ts ~ line 42 ~ mintTx', mintTx);
      console.log(`Minted ${amount} decimal units to account ${toAddress}`);
      return;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
