import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Token", async function () {
  const sampleAddress = "0x8A1eAA7f43D44D06ac1b7677FD6B979538EBc652";

  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const erc20Token = await ERC20Token.deploy();
  await erc20Token.deployed();
  const RewardSystem = await ethers.getContractFactory("RewardSystem");
  const rewardSystem = await RewardSystem.deploy(erc20Token.address);

  it("Deploy ERC20Token on Ropsten", async function () {
    expect(await erc20Token.name()).to.equal("ERC20Token");
    expect(await erc20Token.symbol()).to.equal("ERC20");
    expect(await erc20Token.decimals()).to.equal(18);
    expect(await erc20Token.totalSupply()).to.equal(50000*10**18);
    
    const mint = await erc20Token.mint(sampleAddress, 10);

    // wait until the transaction is mined
    await mint.wait();

    expect(await erc20Token.balanceOf(sampleAddress)).to.equal(10);
  });

  it("Deploy the reward system", async function(){
    expect(await rewardSystem.uintPeriod()).to.equal(2592000);
    expect((await rewardSystem.rewardRate()).div(1000)).to.equal(0.387);

    const calcReward = await rewardSystem.uniqAddress("0x781eAA7f43D44D06ac1b7677FD6B979538EBc652");
    expect(await calcReward).to.equal(false);

    const trader1 = await rewardSystem.trading(sampleAddress, 100);
    await trader1.wait();
    const trader2  = await rewardSystem.trading(sampleAddress, 100);
    await trader2.wait();

    expect(await rewardSystem.marketValue()).to.equal(200);

  });
});
