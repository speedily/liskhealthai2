'use client'

import { useState, useEffect, useCallback } from 'react'
import { Heart, Target, Trophy, Brain, Activity, Droplets, Moon, Flame, Plus, Settings, Wallet } from 'lucide-react'
import { HealthData, HealthGoal, AIInsight } from '@/types'
import { saveToLocalStorage, getFromLocalStorage, calculateRewards } from '@/lib/utils'
import { generateHealthInsights } from '@/lib/ai-service'
import { useBlockchain } from '@/lib/blockchain-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoalForm } from '@/components/health/GoalForm'
import { WalletConnect } from '@/components/blockchain/WalletConnect'

export default function DashboardPage() {
  const [healthData, setHealthData] = useState<HealthData>({
    steps: 0,
    waterIntake: 0,
    sleepHours: 0,
    calories: 0,
    date: new Date().toISOString().split('T')[0]
  })
  
  const [goals, setGoals] = useState<HealthGoal[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [bnyRewards, setBnyRewards] = useState(0)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  
  const { getConnectionStatus, updateHealthData: updateBlockchainData } = useBlockchain()



  const updateHealthData = async (field: keyof HealthData, value: number) => {
    const newData = { ...healthData, [field]: value }
    setHealthData(newData)
    saveToLocalStorage('healthData', newData)

    // Calculate rewards
    const points = calculateRewards(newData.steps, newData.waterIntake, newData.sleepHours)
    const newTotalPoints = totalPoints + points
    setTotalPoints(newTotalPoints)
    saveToLocalStorage('totalPoints', newTotalPoints)

    // Convert points to BNY rewards (100 points = 1 BNY)
    const newRewards = Math.floor(newTotalPoints / 100)
    setBnyRewards(newRewards)
    saveToLocalStorage('bnyRewards', newRewards)

    // Update blockchain if connected
    if (getConnectionStatus()) {
      try {
        await updateBlockchainData(newData)
      } catch (error) {
        console.error('Error updating blockchain:', error)
      }
    }

    // Note: Insights are now generated only on initial load to prevent API exhaustion
    // Users can manually refresh insights using the button below
  }

  const addGoal = (goal: Omit<HealthGoal, 'id' | 'current' | 'completed'>) => {
    const newGoal: HealthGoal = {
      ...goal,
      id: Date.now().toString(),
      current: 0,
      completed: false
    }
    const newGoals = [...goals, newGoal]
    setGoals(newGoals)
    saveToLocalStorage('goals', newGoals)
    setShowGoalForm(false)
  }

  const updateGoalProgress = (goalId: string, current: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const completed = current >= goal.target
        return { ...goal, current, completed }
      }
      return goal
    })
    setGoals(updatedGoals)
    saveToLocalStorage('goals', updatedGoals)
  }

  const generateInsights = useCallback(async (currentHealthData: HealthData, currentGoals: HealthGoal[]) => {
    setIsGeneratingInsights(true)
    try {
      const newInsights = await generateHealthInsights(currentHealthData, currentGoals)
      setInsights(newInsights)
    } catch (error) {
      console.error('Error generating insights:', error)
      // Fallback to mock insights
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'recommendation',
          title: 'Great Start!',
          message: 'You&apos;re on track with your daily goals. Keep up the momentum!',
          priority: 'low',
          date: new Date().toISOString(),
          actionable: false
        },
        {
          id: '2',
          type: 'suggestion',
          title: 'Hydration Tip',
          message: 'Try to drink 8 glasses of water today for optimal health.',
          priority: 'medium',
          date: new Date().toISOString(),
          actionable: true,
          actionText: 'Set Water Goal'
        }
      ]
      setInsights(mockInsights)
    } finally {
      setIsGeneratingInsights(false)
    }
  }, [])

  const isConnected = getConnectionStatus()

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHealthData = getFromLocalStorage<HealthData>('healthData')
    const savedGoals = getFromLocalStorage<HealthGoal[]>('goals')
    const savedPoints = getFromLocalStorage<number>('totalPoints') || 0
    const savedRewards = getFromLocalStorage<number>('bnyRewards') || 0

    if (savedHealthData) setHealthData(savedHealthData)
    if (savedGoals) setGoals(savedGoals)
    setTotalPoints(savedPoints)
    setBnyRewards(savedRewards)

    // Generate initial AI insights with current data
    if (savedHealthData && savedGoals) {
      generateInsights(savedHealthData, savedGoals)
    }
  }, []) // Empty dependency array - only run once on mount

  // Only generate insights on initial load, not on every data change
  // This prevents excessive API calls and resource exhaustion

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">LiskHealth AI</span>
            </div>
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <Button
                  onClick={() => setShowWalletConnect(true)}
                  variant="success"
                >
                  Connect Wallet
                </Button>
              ) : (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Connected</span>
                </div>
              )}
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Connection Required */}
      {!isConnected && (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-8">
            <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              To access your health dashboard and start tracking your wellness journey, please connect your MetaMask wallet.
            </p>
            <Button
              onClick={() => setShowWalletConnect(true)}
              size="lg"
              className="w-full"
            >
              Connect MetaMask Wallet
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Don&apos;t have MetaMask? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download here</a>
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Content - Only show when connected */}
      {isConnected && (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">$BNRY Rewards</p>
                <p className="text-2xl font-bold text-gray-900">{bnyRewards}</p>
              </div>
              <Heart className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900">{goals.filter(g => !g.completed).length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Insights</p>
                <p className="text-2xl font-bold text-gray-900">{insights.length}</p>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Tracking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Today&apos;s Health Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Steps */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Steps</span>
                  </div>
                  <input
                    type="number"
                    value={healthData.steps}
                    onChange={(e) => updateHealthData('steps', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter steps"
                  />
                </div>

                {/* Water Intake */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Water (glasses)</span>
                  </div>
                  <input
                    type="number"
                    value={healthData.waterIntake}
                    onChange={(e) => updateHealthData('waterIntake', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter glasses"
                  />
                </div>

                {/* Sleep Hours */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm font-medium text-gray-700">Sleep (hours)</span>
                  </div>
                  <input
                    type="number"
                    value={healthData.sleepHours}
                    onChange={(e) => updateHealthData('sleepHours', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter hours"
                  />
                </div>

                {/* Calories */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Calories</span>
                  </div>
                  <input
                    type="number"
                    value={healthData.calories}
                    onChange={(e) => updateHealthData('calories', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter calories"
                  />
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Goals</h2>
                <Button
                  onClick={() => setShowGoalForm(true)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Goal
                </Button>
              </div>
              
              {goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No goals set yet. Create your first health goal!</p>
                  <Button
                    onClick={() => setShowGoalForm(true)}
                    variant="outline"
                  >
                    Create Your First Goal
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 capitalize">{goal.type}</h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          goal.completed 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {goal.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{goal.current} / {goal.target}</span>
                            <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <Input
                          type="number"
                          value={goal.current}
                          onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value) || 0)}
                          className="w-20 text-center"
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
                <Button
                  onClick={() => generateInsights(healthData, goals)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  disabled={isGeneratingInsights}
                >
                  {isGeneratingInsights ? 'Generating...' : 'Refresh'}
                </Button>
              </div>
              <div className="space-y-4">
                {insights.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm mb-2">No insights yet</p>
                    <p className="text-xs text-gray-400">Click "Refresh" to generate AI insights based on your current health data</p>
                  </div>
                ) : (
                  insights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.message}</p>
                      {insight.actionable && insight.actionText && (
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          {insight.actionText}
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Goal Form Modal */}
      {showGoalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <GoalForm onAddGoal={addGoal} onClose={() => setShowGoalForm(false)} />
          </div>
        </div>
      )}

      {/* Wallet Connect Modal */}
      {showWalletConnect && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <WalletConnect />
            <div className="p-4 border-t">
              <Button 
                onClick={() => setShowWalletConnect(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 