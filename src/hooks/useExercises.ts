import { useContext, useEffect } from "react";
import { ExercisesContext } from "../context/ExercisesContext";

export enum ExerciseLevels {
  EASY = "facile",
  NORMAL = "moyen",
  HARD = "difficile",
}

export default function useExercises() {
  const { list, isLoaded, getExercises } = useContext(ExercisesContext);

  useEffect(() => {
    if (!isLoaded) {
      getExercises();
    }
  }, [getExercises, isLoaded]);

  return {
    list,
    isLoaded: isLoaded,
  };
}

export function useExercise(id: number | null) {
  const { list, isLoaded } = useExercises();
  return {
    exercise: id ? list.find((exercise) => exercise.id === id) : null,
    isLoaded,
  };
}
