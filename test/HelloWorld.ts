import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployHelloWorldFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    return { helloWorld, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("helloWorld method should return default value Hello World", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.helloWorld()).to.equal("Hello World");
    });
    it("owner should return the same address as myAddress", async function () {
      const { helloWorld, owner } = await loadFixture(deployHelloWorldFixture);
      const myAddress = await owner.getAddress()

      expect(await helloWorld.owner()).to.equal(myAddress);
    });
  });
});
