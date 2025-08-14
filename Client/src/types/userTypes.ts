export interface PersonalData {
  fullname: string;
  location: string;
  dob: string;
  height: number;
  weight: number;
}

export interface GoalsData {
  steps: number;
  runningkm: number;
  sleephours: number;
  targetweight: number;
  waterliters: number;
}

export interface ActivityData {
  steps: number;
  water: number;
}