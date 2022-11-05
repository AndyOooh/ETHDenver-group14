import {ethers} from 'hardhat';

// deploy function
export const deployHelloWorld = async (): Promise<void> => {
    try {
      const HelloWorld = await ethers.getContractFactory('HelloWorld');
      const helloWorld = await HelloWorld.deploy();
      await helloWorld.deployed();
      // eslint-disable-next-line no-console
      console.log(`🚀 ~ Hello World contract deployed to ${helloWorld.address}`);
    } catch (error) {
      throw new Error(error as string)
    }
};
