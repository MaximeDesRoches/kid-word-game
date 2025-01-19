import { createContext } from "react";

export type IWord = {
  word: string;
  textToSpeech?: string;
};

export type IExercise = {
  id: string;
  type: "local" | undefined;
  name: string;
  language: string;
  words: IWord[];
};

export interface ExercisesContextType {
  list: IExercise[];
  isLoaded: boolean;
  getExercises: () => void;
  editExercise: (exercise: IExercise) => void;
  createExercise: (exercise: IExercise) => void;
  deleteExercise: (id: string) => void;
}

export const ExercisesContext = createContext<ExercisesContextType>({
  list: [],
  isLoaded: false,
  getExercises: () => {},
  editExercise: () => {},
  createExercise: () => {},
  deleteExercise: () => {},
});
