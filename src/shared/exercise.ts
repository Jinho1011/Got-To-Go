export interface Exercise {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export interface ExerciseRecord extends Exercise {
  sets: Set[];
}

export interface Set {
  id: number;
  reps: number;
  weight: number;
  complete: boolean;
}
