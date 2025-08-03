

// Sources flattened with hardhat v2.26.1 https://hardhat.org

// SPDX-License-Identifier: MIT

// File contracts/HealthContractV2.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.19;

contract HealthContractV2 {
    // Health data structure
    struct HealthData {
        uint256 dailySteps;
        uint256 waterIntake;
        uint256 sleepHours;
        uint256 goalStreak;
        uint256 lastUpdate;
    }
    
    // Rewards structure
    struct Rewards {
        uint256 totalPoints;
        uint256 bnyRewards;
        uint256 lastClaimed;
    }
    
    // User mappings
    mapping(address => HealthData) public userHealthData;
    mapping(address => Rewards) public userRewards;
    mapping(address => bool) public registeredUsers;
    
    // Events
    event UserRegistered(address indexed user, uint256 timestamp);
    event HealthDataUpdated(address indexed user, uint256 steps, uint256 water, uint256 sleep, uint256 timestamp);
    event RewardsClaimed(address indexed user, uint256 points, uint256 bnyAmount, uint256 timestamp);
    
    // Contract version for hackathon
    string public constant VERSION = "2.0.0-HACKATHON";
    uint256 public constant HACKATHON_ID = 20250803; // August 3, 2025
    
    // Register a new user
    function registerUser() external {
        require(!registeredUsers[msg.sender], "User already registered");
        
        registeredUsers[msg.sender] = true;
        userHealthData[msg.sender] = HealthData(0, 0, 0, 0, block.timestamp);
        userRewards[msg.sender] = Rewards(0, 0, 0);
        
        emit UserRegistered(msg.sender, block.timestamp);
    }
    
    // Update user health data
    function updateHealthData(
        uint256 _steps,
        uint256 _waterIntake,
        uint256 _sleepHours
    ) external {
        require(registeredUsers[msg.sender], "User not registered");
        
        HealthData storage data = userHealthData[msg.sender];
        data.dailySteps = _steps;
        data.waterIntake = _waterIntake;
        data.sleepHours = _sleepHours;
        data.lastUpdate = block.timestamp;
        
        // Calculate and add points
        uint256 points = calculatePoints(_steps, _waterIntake, _sleepHours);
        userRewards[msg.sender].totalPoints += points;
        
        emit HealthDataUpdated(msg.sender, _steps, _waterIntake, _sleepHours, block.timestamp);
    }
    
    // Calculate points based on health metrics
    function calculatePoints(
        uint256 _steps,
        uint256 _waterIntake,
        uint256 _sleepHours
    ) internal pure returns (uint256) {
        uint256 points = 0;
        
        // Points for steps (1 point per 100 steps, max 100 points)
        points += (_steps / 100) > 100 ? 100 : (_steps / 100);
        
        // Points for water intake (10 points per glass, max 80 points)
        points += (_waterIntake * 10) > 80 ? 80 : (_waterIntake * 10);
        
        // Points for sleep (15 points per hour, max 120 points)
        points += (_sleepHours * 15) > 120 ? 120 : (_sleepHours * 15);
        
        return points;
    }
    
    // Claim BNY rewards
    function claimRewards() external {
        require(registeredUsers[msg.sender], "User not registered");
        
        Rewards storage rewards = userRewards[msg.sender];
        uint256 bnyAmount = rewards.totalPoints / 100; // 100 points = 1 BNY
        
        require(bnyAmount > 0, "No rewards to claim");
        
        rewards.bnyRewards += bnyAmount;
        rewards.lastClaimed = block.timestamp;
        
        emit RewardsClaimed(msg.sender, rewards.totalPoints, bnyAmount, block.timestamp);
    }
    
    // Get user health data
    function getUserHealthData(address _user) external view returns (HealthData memory) {
        require(registeredUsers[_user], "User not registered");
        return userHealthData[_user];
    }
    
    // Get user rewards
    function getUserRewards(address _user) external view returns (Rewards memory) {
        require(registeredUsers[_user], "User not registered");
        return userRewards[_user];
    }
    
    // Check if user is registered
    function isUserRegistered(address _user) external view returns (bool) {
        return registeredUsers[_user];
    }
}
