const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying LiskHealth AI to Lisk Sepolia...");

  // Get signers from hardhat
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get the contract factory
  const HealthContractV2 = await ethers.getContractFactory("HealthContractV2", deployer);
  
  // Deploy the contract
  console.log("Deploying contract...");
  const healthContractV2 = await HealthContractV2.deploy();
  await healthContractV2.waitForDeployment();

  let healthContractAddress;
  try {
    healthContractAddress = await healthContractV2.getAddress();
  } catch (error) {
    healthContractAddress = healthContractV2.address;
  }
  
  console.log("HealthContractV2 deployed to:", healthContractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    network: "lisk-sepolia",
    contractName: "HealthContractV2",
    healthContractAddress: healthContractAddress,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    version: "2.0.0-HACKATHON",
    hackathonPeriod: "August 2025",
    deploymentType: "Fresh deployment to Lisk Sepolia"
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
  
  console.log("Contract deployed successfully to Lisk Sepolia!");
  console.log("Update your .env.local file with:");
  console.log(`NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS=${healthContractAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${healthContractAddress}`);
  
  console.log("\n🎉 Fresh contract deployed to Lisk Sepolia for hackathon!");
  console.log("📅 Deployment Date:", new Date().toISOString());
  console.log("🏆 Ready for hackathon submission!");
  console.log("🔗 Contract Address:", healthContractAddress);
  console.log("🌐 Explorer:", `https://sepolia-blockscout.lisk.com/address/${healthContractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 