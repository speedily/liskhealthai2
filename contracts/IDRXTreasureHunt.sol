// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract IDRXTreasureHunt is Ownable, ReentrancyGuard {
    IERC20 public idrxToken;
    
    struct Treasure {
        string name;
        string location; // GPS coordinates or location hash
        uint256 reward; // IDRX reward amount
        bool isActive;
        bool isFound;
        address finder;
        uint256 createdAt;
        uint256 foundAt;
        string hint;
    }
    
    struct Player {
        uint256 treasuresFound;
        uint256 totalRewards;
        uint256 lastActivity;
        bool isRegistered;
    }
    
    struct GameStats {
        uint256 totalTreasures;
        uint256 totalFound;
        uint256 totalRewardsDistributed;
        uint256 activePlayers;
    }
    
    mapping(uint256 => Treasure) public treasures;
    mapping(address => Player) public players;
    mapping(address => uint256[]) public playerFoundTreasures;
    mapping(uint256 => address[]) public treasureFinders;
    
    GameStats public gameStats;
    uint256 public treasureId;
    uint256 public minReward = 10; // 10 IDRX minimum
    uint256 public maxReward = 1000; // 1000 IDRX maximum
    
    event TreasureCreated(uint256 indexed id, string name, string location, uint256 reward);
    event TreasureFound(uint256 indexed id, address indexed finder, uint256 reward);
    event PlayerRegistered(address indexed player);
    event RewardClaimed(address indexed player, uint256 amount);
    
    constructor(address _idrxToken) {
        idrxToken = IERC20(_idrxToken);
        gameStats = GameStats(0, 0, 0, 0);
    }
    
    modifier onlyRegistered() {
        require(players[msg.sender].isRegistered, "Player not registered");
        _;
    }
    
    function registerPlayer() external {
        require(!players[msg.sender].isRegistered, "Already registered");
        
        players[msg.sender] = Player({
            treasuresFound: 0,
            totalRewards: 0,
            lastActivity: block.timestamp,
            isRegistered: true
        });
        
        gameStats.activePlayers++;
        emit PlayerRegistered(msg.sender);
    }
    
    function createTreasure(
        string memory name,
        string memory location,
        uint256 reward,
        string memory hint
    ) external onlyOwner {
        require(reward >= minReward && reward <= maxReward, "Invalid reward amount");
        require(idrxToken.balanceOf(address(this)) >= reward, "Insufficient contract balance");
        
        treasureId++;
        treasures[treasureId] = Treasure({
            name: name,
            location: location,
            reward: reward,
            isActive: true,
            isFound: false,
            finder: address(0),
            createdAt: block.timestamp,
            foundAt: 0,
            hint: hint
        });
        
        gameStats.totalTreasures++;
        emit TreasureCreated(treasureId, name, location, reward);
    }
    
    function findTreasure(uint256 _treasureId, string memory proof) external onlyRegistered nonReentrant {
        Treasure storage treasure = treasures[_treasureId];
        require(treasure.isActive, "Treasure not active");
        require(!treasure.isFound, "Treasure already found");
        require(idrxToken.balanceOf(address(this)) >= treasure.reward, "Insufficient rewards");
        
        // Mark treasure as found
        treasure.isFound = true;
        treasure.finder = msg.sender;
        treasure.foundAt = block.timestamp;
        
        // Update player stats
        Player storage player = players[msg.sender];
        player.treasuresFound++;
        player.totalRewards += treasure.reward;
        player.lastActivity = block.timestamp;
        
        // Update game stats
        gameStats.totalFound++;
        gameStats.totalRewardsDistributed += treasure.reward;
        
        // Track player's found treasures
        playerFoundTreasures[msg.sender].push(_treasureId);
        treasureFinders[_treasureId].push(msg.sender);
        
        // Transfer IDRX reward
        require(idrxToken.transfer(msg.sender, treasure.reward), "Reward transfer failed");
        
        emit TreasureFound(_treasureId, msg.sender, treasure.reward);
    }
    
    function getPlayerStats(address player) external view returns (Player memory) {
        return players[player];
    }
    
    function getTreasure(uint256 _treasureId) external view returns (Treasure memory) {
        return treasures[_treasureId];
    }
    
    function getPlayerFoundTreasures(address player) external view returns (uint256[] memory) {
        return playerFoundTreasures[player];
    }
    
    function getActiveTreasures() external view returns (uint256[] memory) {
        uint256[] memory active = new uint256[](gameStats.totalTreasures);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= treasureId; i++) {
            if (treasures[i].isActive && !treasures[i].isFound) {
                active[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        assembly {
            mstore(active, count)
        }
        
        return active;
    }
    
    function fundContract(uint256 amount) external onlyOwner {
        require(idrxToken.transferFrom(msg.sender, address(this), amount), "Funding failed");
    }
    
    function updateRewardLimits(uint256 _minReward, uint256 _maxReward) external onlyOwner {
        minReward = _minReward;
        maxReward = _maxReward;
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = idrxToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(idrxToken.transfer(owner(), balance), "Withdrawal failed");
    }
} 