// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Arbitrage = await hre.ethers.getContractFactory("FlashloanArbitrage");

  const AAVE_LENDING_POOL_ADDRESS_PROVIDER = "0xC911B590248d127aD18546B186cC6B324e99F02c"; // PoolAddressesProvider-Aave on Goerli
  const arbitrage = await Arbitrage.deploy(AAVE_LENDING_POOL_ADDRESS_PROVIDER);

  await arbitrage.deployed();
  console.log("arbitrage address:", arbitrage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
