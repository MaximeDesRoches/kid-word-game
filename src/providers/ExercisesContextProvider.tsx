import React from "react";
import { CDN_BASE } from "../Constants";
import { IExercise, ExercisesContext } from "../context/ExercisesContext";
import { getJSON } from "../utils/api";

export function ExercisesContextProvider({
  children,
}: React.PropsWithChildren) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [list, setList] = React.useState<IExercise[]>([]);
  const getExercises = async () => {
    const data = await getJSON<IExercise[]>(
      CDN_BASE + "/assets/exercises.json?v=" + Date.now()
    );
    setList(data);
    setIsLoaded(true);
  };

  return (
    <ExercisesContext.Provider value={{ list, isLoaded, getExercises }}>
      {children}
    </ExercisesContext.Provider>
  );
}
