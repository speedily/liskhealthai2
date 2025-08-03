// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HealthContract {
    struct HealthData {
        uint256 dailySteps;
        uint256 waterIntake;
        uint256 sleepHours;
        uint256 goalStreak;
        uint256 lastUpdate;
    }
    
    struct UserRewards {
        uint256 totalPoints;
        uint256 bnyRewards;
        uint256 lastClaimed;
    }
    
    mapping(address => HealthData) public userHealthData;
    mapping(address => UserRewards) public userRewards;
    mapping(address => bool) public registeredUsers;
    
    event HealthDataUpdated(address indexed user, uint256 steps, uint256 water, uint256 sleep);
    event RewardsEarned(address indexed user, uint256 points, uint256 bnyAmount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User not registered");
        _;
    }
    
    function registerUser() external {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
        
        userHealthData[msg.sender] = HealthData({
            dailySteps: 0,
            waterIntake: 0,
            sleepHours: 0,
            goalStreak: 0,
            lastUpdate: block.timestamp
        });
        
        userRewards[msg.sender] = UserRewards({
            totalPoints: 0,
            bnyRewards: 0,
            lastClaimed: 0
        });
    }
    
    function updateHealthData(
        uint256 steps,
        uint256 water,
        uint256 sleep
    ) external onlyRegistered {
        require(steps >= 0 && water >= 0 && sleep >= 0, "Invalid health data");
        
        HealthData storage data = userHealthData[msg.sender];
        data.dailySteps = steps;
        data.waterIntake = water;
        data.sleepHours = sleep;
        data.lastUpdate = block.timestamp;
        
        // Calculate points and rewards
        uint256 points = calculatePoints(steps, water, sleep);
        uint256 bnyAmount = points / 100; // 100 points = 1 BNY
        
        UserRewards storage rewards = userRewards[msg.sender];
        rewards.totalPoints += points;
        rewards.bnyRewards += bnyAmount;
        
        emit HealthDataUpdated(msg.sender, steps, water, sleep);
        emit RewardsEarned(msg.sender, points, bnyAmount);
    }
    
    function calculatePoints(
        uint256 steps,
        uint256 water,
        uint256 sleep
    ) internal pure returns (uint256) {
        uint256 points = 0;
        
        // Steps rewards (10,000 steps = 100 points)
        if (steps >= 10000) {
            points += 100;
        } else {
            points += steps / 100;
        }
        
        // Water intake rewards (8 glasses = 50 points)
        if (water >= 8) {
            points += 50;
        } else {
            points += water * 6; // 6.25 points per glass
        }
        
        // Sleep rewards (7-9 hours = 50 points)
        if (sleep >= 7 && sleep <= 9) {
            points += 50;
        } else if (sleep >= 6 && sleep <= 10) {
            points += 25;
        }
        
        return points;
    }
    
    function claimRewards() external onlyRegistered {
        UserRewards storage rewards = userRewards[msg.sender];
        require(rewards.bnyRewards > 0, "No rewards to claim");
        
        uint256 amount = rewards.bnyRewards;
        rewards.bnyRewards = 0;
        rewards.lastClaimed = block.timestamp;
        
        // In a real implementation, this would transfer BNY tokens
        // For now, we just emit an event
        emit RewardsClaimed(msg.sender, amount);
    }
    
    function getUserHealthData(address user) external view returns (HealthData memory) {
        return userHealthData[user];
    }
    
    function getUserRewards(address user) external view returns (UserRewards memory) {
        return userRewards[user];
    }
    
    function getTotalPoints(address user) external view returns (uint256) {
        return userRewards[user].totalPoints;
    }
    
    function getBNYRewards(address user) external view returns (uint256) {
        return userRewards[user].bnyRewards;
    }
} 