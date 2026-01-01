
export type ActivityType = 'running' | 'gym';

export interface Set {
  id: string;
  reps: number;
  weight: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface RunningActivity {
  isInterval?: boolean;
  intervalCount?: number;
  intervalValue?: number;
  intervalType?: 'distance' | 'time';
  description: string;
  distance: number; // in km
  timeMinutes: number;
}

export interface GymActivity {
  exercises: Exercise[];
}

export interface WorkoutSession {
  id: string;
  date: string; // ISO format YYYY-MM-DD
  type: ActivityType;
  running?: RunningActivity;
  gym?: GymActivity;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  type: ActivityType;
  running?: RunningActivity;
  gym?: GymActivity;
}

export interface DailyData {
  [date: string]: WorkoutSession[];
}
