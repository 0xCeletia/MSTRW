import { ethers } from "hardhat";

async function main() {
  const Mint = await ethers.getContractFactory("Mint");
  const mint = await Mint.deploy();

  await mint.deployed();

  console.log(`Polygon Mumbai contract deployer to  ${mint.address}`);

  console.log(
    `Block explorer URL: https://mumbai.polygonscan.com/address/${mint.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
