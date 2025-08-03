// Add this at the top of the file for TypeScript support
interface EthereumProvider {
  request: (...args: unknown[]) => Promise<unknown>;
  on?: (...args: unknown[]) => void;
  removeListener?: (...args: unknown[]) => void;
  // Add more methods as needed
}
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

import { ethers } from 'ethers'
import { HealthData } from '@/types'

// Health Contract ABI (simplified for demo)
const HEALTH_CONTRACT_ABI = [
  "function registerUser() external",
  "function updateHealthData(uint256 steps, uint256 water, uint256 sleep) external",
  "function getUserHealthData(address user) external view returns (tuple(uint256 dailySteps, uint256 waterIntake, uint256 sleepHours, uint256 goalStreak, uint256 lastUpdate))",
  "function getUserRewards(address user) external view returns (tuple(uint256 totalPoints, uint256 bnyRewards, uint256 lastClaimed))",
  "function claimRewards() external",
  "function getTotalPoints(address user) external view returns (uint256)",
  "function getBNYRewards(address user) external view returns (uint256)"
]

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.JsonRpcSigner | null = null
  private healthContract: ethers.Contract | null = null
  private isConnected = false

  constructor() {
    this.initializeProvider()
  }

  private initializeProvider() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum)
    }
  }

  async connectWallet(): Promise<{ success: boolean; address?: string; error?: string }> {
    try {
      if (!this.provider) {
        throw new Error('No wallet provider found. Please install MetaMask.')
      }

      // Request account access
      const accounts = await this.provider.send('eth_requestAccounts', [])
      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      this.signer = await this.provider.getSigner()
      const address = await this.signer.getAddress()
      
      // Initialize contract
      const contractAddress = process.env.NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS
      if (contractAddress && contractAddress !== '0x0000000000000000000000000000000000000000') {
        this.healthContract = new ethers.Contract(
          contractAddress,
          HEALTH_CONTRACT_ABI,
          this.signer
        )
      }

      this.isConnected = true
      return { success: true, address }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect wallet' 
      }
    }
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null
    this.signer = null
    this.healthContract = null
    this.isConnected = false
  }

  async registerUser(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.healthContract) {
        throw new Error('Contract not initialized')
      }

      const tx = await this.healthContract.registerUser()
      await tx.wait()
      return { success: true }
    } catch (error) {
      console.error('Error registering user:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to register user' 
      }
    }
  }

  async updateHealthData(healthData: HealthData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.healthContract) {
        throw new Error('Contract not initialized')
      }

      const tx = await this.healthContract.updateHealthData(
        healthData.steps,
        healthData.waterIntake,
        healthData.sleepHours
      )
      await tx.wait()
      return { success: true }
    } catch (error) {
      console.error('Error updating health data:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update health data' 
      }
    }
  }

  async getUserHealthData(address: string): Promise<{
    dailySteps: number;
    waterIntake: number;
    sleepHours: number;
    goalStreak: number;
    lastUpdate: number;
  } | null> {
    try {
      if (!this.healthContract) {
        throw new Error('Contract not initialized')
      }

      const data = await this.healthContract.getUserHealthData(address)
      return {
        dailySteps: Number(data.dailySteps),
        waterIntake: Number(data.waterIntake),
        sleepHours: Number(data.sleepHours),
        goalStreak: Number(data.goalStreak),
        lastUpdate: Number(data.lastUpdate)
      }
    } catch (error) {
      console.error('Error getting user health data:', error)
      return null
    }
  }

  async getUserRewards(address: string): Promise<{
    totalPoints: number;
    bnyRewards: number;
    lastClaimed: number;
  } | null> {
    try {
      if (!this.healthContract) {
        throw new Error('Contract not initialized')
      }

      const rewards = await this.healthContract.getUserRewards(address)
      return {
        totalPoints: Number(rewards.totalPoints),
        bnyRewards: Number(rewards.bnyRewards),
        lastClaimed: Number(rewards.lastClaimed)
      }
    } catch (error) {
      console.error('Error getting user rewards:', error)
      return null
    }
  }

  async claimRewards(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.healthContract) {
        throw new Error('Contract not initialized')
      }

      const tx = await this.healthContract.claimRewards()
      await tx.wait()
      return { success: true }
    } catch (error) {
      console.error('Error claiming rewards:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to claim rewards' 
      }
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected
  }

  async getCurrentAddress(): Promise<string | null> {
    try {
      if (!this.signer) return null
      return await this.signer.getAddress()
    } catch (error) {
      console.error('Error getting current address:', error)
      return null
    }
  }
}

// Create singleton instance
export const blockchainService = new BlockchainService()

// Hook for React components
export function useBlockchain() {
  return {
    connectWallet: blockchainService.connectWallet.bind(blockchainService),
    disconnectWallet: blockchainService.disconnectWallet.bind(blockchainService),
    registerUser: blockchainService.registerUser.bind(blockchainService),
    updateHealthData: blockchainService.updateHealthData.bind(blockchainService),
    getUserHealthData: blockchainService.getUserHealthData.bind(blockchainService),
    getUserRewards: blockchainService.getUserRewards.bind(blockchainService),
    claimRewards: blockchainService.claimRewards.bind(blockchainService),
    getConnectionStatus: blockchainService.getConnectionStatus.bind(blockchainService),
    getCurrentAddress: blockchainService.getCurrentAddress.bind(blockchainService)
  }
} 