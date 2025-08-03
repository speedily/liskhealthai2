import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { HealthContractV2__factory } from '../contracts/HealthContractV2__factory'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_HEALTH_CONTRACT_ADDRESS!

export function useHealthContract() {
  const { address, isConnected } = useAccount()
  
  const contract = {
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: HealthContractV2__factory.abi,
  }

  // Read functions
  const { data: isRegistered } = useReadContract({
    ...contract,
    functionName: 'isUserRegistered',
    args: [address!],
    query: {
      enabled: !!address,
    },
  })

  const { data: healthData } = useReadContract({
    ...contract,
    functionName: 'getUserHealthData',
    args: [address!],
    query: {
      enabled: !!address && !!isRegistered,
    },
  })

  const { data: rewards } = useReadContract({
    ...contract,
    functionName: 'getUserRewards',
    args: [address!],
    query: {
      enabled: !!address && !!isRegistered,
    },
  })

  // Write functions
  const { writeContract: registerUser, isPending: isRegistering } = useWriteContract()

  const { writeContract: updateHealthData, isPending: isUpdating } = useWriteContract()

  const { writeContract: claimRewards, isPending: isClaiming } = useWriteContract()

  const register = () => {
    if (!address) return
    registerUser({
      ...contract,
      functionName: 'registerUser',
    })
  }

  const updateHealth = (steps: number, water: number, sleep: number) => {
    if (!address) return
    updateHealthData({
      ...contract,
      functionName: 'updateHealthData',
      args: [BigInt(steps), BigInt(water), BigInt(sleep)],
    })
  }

  const claim = () => {
    if (!address) return
    claimRewards({
      ...contract,
      functionName: 'claimRewards',
    })
  }

  return {
    // State
    address,
    isConnected,
    isRegistered,
    healthData,
    rewards,
    
    // Actions
    register,
    updateHealth,
    claim,
    
    // Loading states
    isRegistering,
    isUpdating,
    isClaiming,
  }
} 