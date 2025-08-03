import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { IDRXTreasureHunt__factory } from '../contracts/IDRXTreasureHunt__factory'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TREASURE_HUNT_CONTRACT_ADDRESS!

export function useTreasureHunt() {
  const { address, isConnected } = useAccount()
  
  const contract = {
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: IDRXTreasureHunt__factory.abi,
  }

  // Read functions
  const { data: playerStats } = useReadContract({
    ...contract,
    functionName: 'getPlayerStats',
    args: [address!],
    query: {
      enabled: !!address,
    },
  })

  const { data: gameStats } = useReadContract({
    ...contract,
    functionName: 'gameStats',
    query: {
      enabled: true,
    },
  })

  const { data: activeTreasures } = useReadContract({
    ...contract,
    functionName: 'getActiveTreasures',
    query: {
      enabled: true,
    },
  })

  // Write functions
  const { writeContract: registerPlayer, isPending: isRegistering } = useWriteContract()

  const { writeContract: findTreasure, isPending: isFinding } = useWriteContract()

  const register = () => {
    if (!address) return
    registerPlayer({
      ...contract,
      functionName: 'registerPlayer',
    })
  }

  const find = (treasureId: number, proof: string) => {
    if (!address) return
    findTreasure({
      ...contract,
      functionName: 'findTreasure',
      args: [BigInt(treasureId), proof],
    })
  }

  // Get individual treasure data
  const getTreasure = (treasureId: number) => {
    return useReadContract({
      ...contract,
      functionName: 'getTreasure',
      args: [BigInt(treasureId)],
      query: {
        enabled: !!treasureId,
      },
    })
  }

  return {
    // State
    address,
    isConnected,
    playerStats,
    gameStats,
    activeTreasures,
    
    // Actions
    register,
    find,
    getTreasure,
    
    // Loading states
    isRegistering,
    isFinding,
  }
} 