import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

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
      accounts: [GOERLI_PRIVATE_KEY],
    },
    // fuji: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   accounts: [FUJI_PRIVATE_KEY],
    // }
  },
};

export default config;
