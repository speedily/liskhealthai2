const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying LiskHealth AI contracts...");

  // Get the contract factory
  const HealthContract = await ethers.getContractFactory("HealthContract");
  
  // Deploy the contract
  const healthContract = await HealthContract.deploy();
  await healthContract.waitForDeployment();

  let healthContractAddress;
  try {
    healthContractAddress = await healthContract.getAddress();
  } catch (error) {
    healthContractAddress = healthContract.address;
  }
  
  console.log("HealthContract deployed to:", healthContractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    network: "hardhat-local",
    healthContractAddress: healthContractAddress,
    deployedAt: new Date().toISOString(),
    deployer: "Local Hardhat Network"
  };

  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
  
  console.log("Contract deployed successfully!");
  console.log("Update your .env.local file with:");
  console.log(`NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS=${healthContractAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${healthContractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 