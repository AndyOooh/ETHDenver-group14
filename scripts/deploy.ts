import {ethers} from 'hardhat';

async function main(): Promise<void> {
	const HelloWorld = await ethers.getContractFactory("HelloWorld");
	const helloWorld = await HelloWorld.deploy();
  
	await helloWorld.deployed();
  
	// eslint-disable-next-line no-console
	console.log(`🚀 ~ Hello World contract deployed to ${helloWorld.address}`);
}

main().catch(error => {
	// eslint-disable-next-line no-console
	console.error(error);
	process.exitCode = 1;
});
