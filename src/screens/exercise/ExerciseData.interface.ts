interface IExerciseData {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

interface IPlanData {
  name: string;
  set: string;
  weight: string;
  count: string;
  isCompleted: boolean;
}

export { IExerciseData, IPlanData };
