const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying IDRX Treasure Hunt contract to Lisk Mainnet...");

  // IDRX token address on Lisk Mainnet
  const IDRX_TOKEN_ADDRESS = "0x18bc5bcc660cf2b9ce3cd51a404afe1a0cbd3c22";

  // Get the contract factory
  const [deployer] = await ethers.getSigners();
  const IDRXTreasureHunt = await ethers.getContractFactory("IDRXTreasureHunt", deployer);
  
  // Deploy the contract
  const treasureHunt = await IDRXTreasureHunt.deploy(IDRX_TOKEN_ADDRESS);
  await treasureHunt.waitForDeployment();

  let contractAddress;
  try {
    contractAddress = await treasureHunt.getAddress();
  } catch (error) {
    contractAddress = treasureHunt.address;
  }
  
  console.log("IDRXTreasureHunt deployed to:", contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    network: "lisk-mainnet",
    contractName: "IDRXTreasureHunt",
    contractAddress: contractAddress,
    idrxTokenAddress: IDRX_TOKEN_ADDRESS,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    version: "1.0.0-HACKATHON",
    hackathonPeriod: "August 2025"
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
  
  console.log("Contract deployed successfully for Hackathon!");
  console.log("Update your .env.local file with:");
  console.log(`NEXT_PUBLIC_TREASURE_HUNT_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`NEXT_PUBLIC_IDRX_TOKEN_ADDRESS=${IDRX_TOKEN_ADDRESS}`);
  
  console.log("\n🎉 IDRX Treasure Hunt deployed on Lisk Mainnet!");
  console.log("📅 Deployment Date:", new Date().toISOString());
  console.log("🏆 Ready for hackathon submission!");
  console.log("🗺️  Players can now hunt for treasures and earn IDRX!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 