import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Health data utilities
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100
  return weight / (heightInMeters * heightInMeters)
}

export function getHealthStatus(bmi: number): string {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

export function calculateDailyCalories(weight: number, height: number, age: number, gender: string, activityLevel: string): number {
  // Basic BMR calculation using Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * height - 5 * age
  bmr = gender === 'male' ? bmr + 5 : bmr - 161

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extremelyActive: 1.9
  }

  return Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers])
}

// Local storage utilities for privacy
export function saveToLocalStorage(key: string, data: unknown): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }
  return null
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// Date utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getDaysInStreak(lastActivityDate: Date): number {
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - lastActivityDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Reward calculation utilities
export function calculateRewards(steps: number, waterIntake: number, sleepHours: number): number {
  let points = 0
  
  // Steps rewards (10,000 steps = 100 points)
  if (steps >= 10000) points += 100
  else points += Math.floor(steps / 100)
  
  // Water intake rewards (8 glasses = 50 points)
  if (waterIntake >= 8) points += 50
  else points += Math.floor(waterIntake * 6.25)
  
  // Sleep rewards (7-9 hours = 50 points)
  if (sleepHours >= 7 && sleepHours <= 9) points += 50
  else if (sleepHours >= 6 && sleepHours <= 10) points += 25
  
  return points
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}



export function validateHealthData(data: unknown): boolean {
  if (
    typeof data === 'object' &&
    data !== null &&
    'steps' in data && 'waterIntake' in data && 'sleepHours' in data
  ) {
    const d = data as { steps: unknown; waterIntake: unknown; sleepHours: unknown };
    return (
      typeof d.steps === 'number' && d.steps >= 0 &&
      typeof d.waterIntake === 'number' && d.waterIntake >= 0 &&
      typeof d.sleepHours === 'number' && d.sleepHours >= 0
    );
  }
  return false;
} 