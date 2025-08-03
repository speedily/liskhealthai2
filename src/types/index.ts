// Health data types
export interface HealthData {
  steps: number
  waterIntake: number
  sleepHours: number
  calories: number
  weight?: number
  height?: number
  date: string
}

export interface HealthGoal {
  id: string
  type: 'steps' | 'water' | 'sleep' | 'calories' | 'weight'
  target: number
  current: number
  startDate: string
  endDate?: string
  completed: boolean
}

export interface UserProfile {
  id: string
  name: string
  email: string
  age: number
  gender: 'male' | 'female' | 'other'
  weight: number
  height: number
  activityLevel: 'sedentary' | 'lightlyActive' | 'moderatelyActive' | 'veryActive' | 'extremelyActive'
  goals: HealthGoal[]
  streak: number
  totalPoints: number
  bnyRewards: number
}

// AI insights types
export interface AIInsight {
  id: string
  type: 'recommendation' | 'warning' | 'achievement' | 'suggestion'
  title: string
  message: string
  priority: 'low' | 'medium' | 'high'
  date: string
  actionable: boolean
  actionText?: string
}

// Social challenge types
export interface Challenge {
  id: string
  title: string
  description: string
  type: 'steps' | 'water' | 'sleep' | 'calories'
  target: number
  duration: number // in days
  participants: number
  reward: number // BNY tokens
  startDate: string
  endDate: string
  isActive: boolean
}

export interface ChallengeParticipation {
  challengeId: string
  userId: string
  progress: number
  joinedAt: string
  completed: boolean
}

// Blockchain types
export interface ContractData {
  healthContractAddress: string
  rewardsContractAddress: string
  network: 'lisk-sepolia' | 'lisk-mainnet'
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
}

// Reward types
export interface Reward {
  id: string
  type: 'daily' | 'achievement' | 'challenge' | 'streak'
  amount: number // BNY tokens
  description: string
  earnedAt: string
  claimed: boolean
}

// UI state types
export interface AppState {
  user: UserProfile | null
  healthData: HealthData[]
  goals: HealthGoal[]
  insights: AIInsight[]
  challenges: Challenge[]
  rewards: Reward[]
  isLoading: boolean
  error: string | null
}

// API response types
export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export interface HealthRecommendation {
  title: string
  description: string
  category: 'nutrition' | 'exercise' | 'sleep' | 'general'
  priority: number
}

// Form types
export interface HealthDataForm {
  steps: number
  waterIntake: number
  sleepHours: number
  calories: number
  weight?: number
}

export interface GoalForm {
  type: HealthGoal['type']
  target: number
  endDate?: string
}

// Achievement types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress: number
  target: number
  reward: number
}

// Privacy types
export interface PrivacySettings {
  shareHealthData: boolean
  shareProgress: boolean
  allowNotifications: boolean
  dataRetentionDays: number
}

// Analytics types
export interface HealthAnalytics {
  weeklyAverage: {
    steps: number
    waterIntake: number
    sleepHours: number
    calories: number
  }
  monthlyTrend: {
    steps: number[]
    waterIntake: number[]
    sleepHours: number[]
    calories: number[]
  }
  achievements: Achievement[]
  totalRewards: number
  streakDays: number
} 