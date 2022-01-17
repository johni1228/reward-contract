// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const RewardSystem = await ethers.getContractFactory("RewardSystem");

  const erc20Token = await ERC20Token.deploy();
  await erc20Token.deployed();
  
  console.log("Address of token is ", erc20Token.address);

  const rewardSystem = await RewardSystem.deploy(erc20Token.address);
  await rewardSystem.deployed();

  console.log("Address of reward system is ", rewardSystem.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
