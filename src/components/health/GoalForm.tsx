'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Target, Plus, X } from 'lucide-react'
import { HealthGoal } from '@/types'

interface GoalFormProps {
  onAddGoal: (goal: Omit<HealthGoal, 'id' | 'current' | 'completed'>) => void
  onClose: () => void
}

export function GoalForm({ onAddGoal, onClose }: GoalFormProps) {
  const [goalType, setGoalType] = useState<HealthGoal['type']>('steps')
  const [target, setTarget] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!target || isNaN(Number(target))) {
      alert('Please enter a valid target')
      return
    }

    const newGoal = {
      type: goalType,
      target: Number(target),
      startDate: new Date().toISOString(),
      endDate: endDate || undefined
    }

    onAddGoal(newGoal)
    onClose()
  }

  const getGoalTypeLabel = (type: HealthGoal['type']) => {
    switch (type) {
      case 'steps': return 'Daily Steps'
      case 'water': return 'Water Intake (glasses)'
      case 'sleep': return 'Sleep Hours'
      case 'calories': return 'Daily Calories'
      case 'weight': return 'Weight (kg)'
      default: return type
    }
  }

  const getGoalTypeIcon = (type: HealthGoal['type']) => {
    switch (type) {
      case 'steps': return '👟'
      case 'water': return '💧'
      case 'sleep': return '😴'
      case 'calories': return '🔥'
      case 'weight': return '⚖️'
      default: return '🎯'
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Set New Goal
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Goal Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['steps', 'water', 'sleep', 'calories', 'weight'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setGoalType(type)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    goalType === type
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg mb-1">{getGoalTypeIcon(type)}</div>
                  <div className="text-sm font-medium">{getGoalTypeLabel(type)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Target Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Target {getGoalTypeLabel(goalType)}
            </label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={`Enter target ${goalType === 'steps' ? 'steps' : goalType === 'water' ? 'glasses' : goalType === 'sleep' ? 'hours' : goalType === 'calories' ? 'calories' : 'kg'}`}
              required
            />
          </div>

          {/* End Date (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">End Date (Optional)</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 