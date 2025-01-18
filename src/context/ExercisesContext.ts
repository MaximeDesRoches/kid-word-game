import { createContext } from "react";

export type IWord = {
  word: string;
  textToSpeech?: string;
};

export type IExercise = {
  id: number;
  name: string;
  language: string;
  words: IWord[];
};

export interface ExercisesContextType {
  list: IExercise[];
  isLoaded: boolean;
  getExercises: () => void;
}

export const ExercisesContext = createContext<ExercisesContextType>({
  list: [],
  isLoaded: false,
  getExercises: () => {},
});
