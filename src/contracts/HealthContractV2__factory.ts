export const HealthContractV2__factory = {
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "steps",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "water",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sleep",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "HealthDataUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "points",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "bnyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "RewardsClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "HACKATHON_ID",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "registeredUsers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userHealthData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "dailySteps",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "waterIntake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sleepHours",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "goalStreak",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userRewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalPoints",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "bnyRewards",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastClaimed",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimRewards",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserHealthData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "dailySteps",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "waterIntake",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sleepHours",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "goalStreak",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastUpdate",
              "type": "uint256"
            }
          ],
          "internalType": "struct HealthContractV2.HealthData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserRewards",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "totalPoints",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "bnyRewards",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "lastClaimed",
              "type": "uint256"
            }
          ],
          "internalType": "struct HealthContractV2.Rewards",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "isUserRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_steps",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_waterIntake",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_sleepHours",
          "type": "uint256"
        }
      ],
      "name": "updateHealthData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
} 