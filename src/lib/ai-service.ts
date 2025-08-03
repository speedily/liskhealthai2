import OpenAI from 'openai'
import { AIInsight, HealthData, HealthGoal } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function generateHealthInsights(
  healthData: HealthData,
  goals: HealthGoal[]
): Promise<AIInsight[]> {
  try {
    const prompt = `
      Based on the following health data, provide 3 personalized insights and recommendations:
      
      Health Data:
      - Steps: ${healthData.steps}
      - Water Intake: ${healthData.waterIntake} glasses
      - Sleep: ${healthData.sleepHours} hours
      - Calories: ${healthData.calories}
      
      Active Goals: ${goals.map(g => `${g.type}: ${g.current}/${g.target}`).join(', ')}
      
      Please provide insights in this JSON format:
      [
        {
          "id": "unique_id",
          "type": "recommendation|warning|achievement|suggestion",
          "title": "Short title",
          "message": "Detailed message with actionable advice",
          "priority": "low|medium|high",
          "actionable": true/false,
          "actionText": "Action button text if actionable"
        }
      ]
      
      Focus on:
      1. Celebrating achievements
      2. Providing actionable advice
      3. Goal-specific recommendations
      4. Health best practices
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a health and wellness AI assistant. Provide helpful, encouraging, and actionable health insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    try {
      const insights = JSON.parse(response)
      return insights.map((insight: {
        id: string;
        type: string;
        title: string;
        message: string;
        priority: string;
        actionable: boolean;
        actionText?: string;
      }) => ({
        ...insight,
        date: new Date().toISOString()
      }))
    } catch {
      // Fallback to mock insights if JSON parsing fails
      return generateMockInsights(healthData)
    }
  } catch (error) {
    console.error('Error generating AI insights:', error)
    // Return mock insights as fallback
    return generateMockInsights(healthData)
  }
}

function generateMockInsights(healthData: HealthData): AIInsight[] {
  const insights: AIInsight[] = []

  // Steps insight
  if (healthData.steps < 5000) {
    insights.push({
      id: '1',
      type: 'suggestion',
      title: 'Increase Your Steps',
      message: 'Try to reach 10,000 steps today for better cardiovascular health. Take a walk during lunch or use the stairs!',
      priority: 'medium',
      date: new Date().toISOString(),
      actionable: true,
      actionText: 'Set Step Goal'
    })
  } else if (healthData.steps >= 10000) {
    insights.push({
      id: '2',
      type: 'achievement',
      title: 'Great Job on Steps!',
      message: 'You\'ve reached your daily step goal! Keep up the excellent work.',
      priority: 'low',
      date: new Date().toISOString(),
      actionable: false
    })
  }

  // Water insight
  if (healthData.waterIntake < 6) {
    insights.push({
      id: '3',
      type: 'recommendation',
      title: 'Stay Hydrated',
      message: 'Aim for 8 glasses of water daily. Dehydration can affect your energy and focus.',
      priority: 'high',
      date: new Date().toISOString(),
      actionable: true,
      actionText: 'Set Water Goal'
    })
  }

  // Sleep insight
  if (healthData.sleepHours < 7) {
    insights.push({
      id: '4',
      type: 'warning',
      title: 'Sleep Better',
      message: 'Adults need 7-9 hours of sleep. Try to establish a consistent bedtime routine.',
      priority: 'high',
      date: new Date().toISOString(),
      actionable: true,
      actionText: 'Set Sleep Goal'
    })
  }

  return insights
}

export async function generateGoalSuggestions(
  healthData: HealthData
): Promise<string[]> {
  try {
    const prompt = `
      Based on this health data, suggest 3 specific, achievable health goals:
      
      Current Data:
      - Steps: ${healthData.steps}
      - Water: ${healthData.waterIntake} glasses
      - Sleep: ${healthData.sleepHours} hours
      - Calories: ${healthData.calories}
      
      Suggest goals in this format:
      ["Goal 1", "Goal 2", "Goal 3"]
      
      Make them specific, measurable, and achievable.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a health coach. Suggest specific, achievable health goals."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    try {
      const suggestions = JSON.parse(response)
      return suggestions
    } catch {
      return generateMockGoalSuggestions(healthData)
    }
  } catch (error) {
    console.error('Error generating goal suggestions:', error)
    return generateMockGoalSuggestions(healthData)
  }
}

function generateMockGoalSuggestions(healthData: HealthData): string[] {
  const suggestions = []

  if (healthData.steps < 8000) {
    suggestions.push(`Walk ${Math.max(10000 - healthData.steps, 2000)} more steps today`)
  }
  
  if (healthData.waterIntake < 8) {
    suggestions.push(`Drink ${8 - healthData.waterIntake} more glasses of water`)
  }
  
  if (healthData.sleepHours < 7) {
    suggestions.push(`Aim for 8 hours of sleep tonight`)
  }

  return suggestions.length > 0 ? suggestions : [
    'Walk 10,000 steps today',
    'Drink 8 glasses of water',
    'Get 8 hours of sleep'
  ]
} 