import { ethers } from 'hardhat';

// deploy function
export const deployHelloWorld = async () => {
  async function main() {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const helloWorld = await HelloWorld.deploy();

    await helloWorld.deployed();

    console.log(`🚀 ~ Hello World contract deployed to ${helloWorld.address}`);
  }

  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
};
