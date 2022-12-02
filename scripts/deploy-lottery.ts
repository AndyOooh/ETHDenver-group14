import 'dotenv/config';
import {ethers} from 'hardhat';
import {Lottery__factory} from '../typechain-types';

export const deployLottery = async (): Promise<void> => {
  if (typeof process.env.METAMASK_PK !== 'string') return;
  const {ALCHEMY_API_KEY, METAMASK_PK} = process.env;
  const [contractName, networkName] = process.argv.slice(2);

  const TOKEN_NAME = 'Lottery';
  const TOKEN_SYMBOL = 'LOT';
  const PURCHASE_RATIO = 10000;
  const BET_PRICE = 1;
  const BET_FEE = 0.2;

  try {
    let ContractFactory: Lottery__factory;
    if (networkName === 'goerli') {
      if (!ALCHEMY_API_KEY) {
        throw new Error('ALCHEMY_API_KEY missing');
      }
      const provider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(METAMASK_PK, provider);
      const signer = wallet.connect(provider);
      ContractFactory = new Lottery__factory(signer);
    } else if (networkName === 'localhost' || networkName === 'hardhat') {
      const accounts = await ethers.getSigners();
      ContractFactory = new Lottery__factory(accounts[0]);
    } else if (networkName === 'mainnet') {
      throw new Error('Mainnet not implemented');
    } else {
      throw new Error('Invalid network name');
    }
    console.log(`deploying ${contractName} contract on network: ${networkName}`);
    const contract = await ContractFactory.deploy(
      TOKEN_NAME,
      TOKEN_SYMBOL,
      PURCHASE_RATIO,
      ethers.utils.parseEther(BET_PRICE.toFixed(18)),
      ethers.utils.parseEther(BET_FEE.toFixed(18))
    );
    await contract.deployed();
    console.log(`Contract ${contractName} deployed to: ${contract.address} on chainId: ${contract.deployTransaction.chainId}
    with constructor args: : ${TOKEN_NAME}, ${TOKEN_SYMBOL}, ${PURCHASE_RATIO}, ${BET_PRICE}, ${BET_FEE}`);
  } catch (error) {
    process.exitCode = 1;
    throw new Error(error as string);
  }
};
