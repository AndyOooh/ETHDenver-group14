import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const {ALCHEMY_API_KEY, ETHERSCAN_API_KEY, GAS_REPORTER_ENABLED, CMC_API_KEY} = process.env;

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const networkArg = process.argv[3];
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY as string;

// Make sure GOERLI_PRIVATE_KEY is set in .env if goerli is chosen as network.
if (networkArg === 'goerli' && !GOERLI_PRIVATE_KEY) {
  throw new Error('GOERLI_PRIVATE_KEY missing');
}

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
    // fuji: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   accounts: [FUJI_PRIVATE_KEY],
    // }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: GAS_REPORTER_ENABLED === 'true' ? true : false, // running gas reporter slows down tests significantly
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    // gasPrice: 21,
    coinmarketcap: CMC_API_KEY, // needed for currency to work
    token: 'ETH'
  }
};

export default config;
