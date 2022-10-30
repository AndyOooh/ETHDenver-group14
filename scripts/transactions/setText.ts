import { ethers } from "ethers";
import HelloWorld from "../../artifacts/contracts/HelloWorld.sol/HelloWorld.json";
import * as dotenv from "dotenv";

dotenv.config();

let nonceOffset = 0;

async function setText(text: string, contractAddress: string) {
  if (!process.env.GOERLI_PRIVATE_KEY) return;
  const provider = new ethers.providers.JsonRpcProvider(
    `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);
  let baseNonce = provider.getTransactionCount(signer.getAddress());
  async function getNonce() {
    return baseNonce.then((nonce: number) => nonce + nonceOffset++);
  }

  const HelloWorldContract = new ethers.Contract(
    contractAddress,
    HelloWorld.abi,
    signer
  );

  let tx = await HelloWorldContract.setText(text, {
    nonce: await getNonce(),
  });
  await tx.wait();
  console.log("🚀 ~ setText tx result", tx);
}

setText("red", "0xD640342d1A18e85655bF104697D9C1fD4026231b");
