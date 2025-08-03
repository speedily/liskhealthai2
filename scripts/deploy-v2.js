const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying LiskHealth AI V2 contracts for Hackathon...");

  // Get the contract factory for V2
  const [deployer] = await ethers.getSigners();
  const HealthContractV2 = await ethers.getContractFactory("HealthContractV2", deployer);
  
  // Deploy the contract
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
    network: "hardhat-local-hackathon",
    contractName: "HealthContractV2",
    healthContractAddress: healthContractAddress,
    deployedAt: new Date().toISOString(),
    deployer: "Local Hardhat Network",
    version: "2.0.0-HACKATHON",
    hackathonPeriod: "August 2025"
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
  
  console.log("Contract deployed successfully for Hackathon!");
  console.log("Update your .env.local file with:");
  console.log(`NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS=${healthContractAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${healthContractAddress}`);
  
  console.log("\n🎉 Fresh contract deployed for hackathon period!");
  console.log("📅 Deployment Date:", new Date().toISOString());
  console.log("🏆 Ready for hackathon submission!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 