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
    const local = JSON.parse(
      window.localStorage.getItem("exercises") || "[]"
    ) as IExercise[];
    setList([...data, ...local]);
    setIsLoaded(true);
  };

  const editExercise = (exercise: IExercise) => {
    const newList = list.map((item) =>
      item.id === exercise.id ? exercise : item
    );
    // save to localstorage
    window.localStorage.setItem(
      "exercises",
      JSON.stringify(newList.filter((e) => e.type === "local"))
    );
    setList(newList);
  };

  const createExercise = (exercise: IExercise) => {
    const injectedIdExercise = {
      ...exercise,
      id: "local-" + Math.random().toString(36).substring(7),
    };
    setList([...list, injectedIdExercise]);
    // save to localstorage
    window.localStorage.setItem(
      "exercises",
      JSON.stringify(
        [...list, injectedIdExercise].filter((e) => e.type === "local")
      )
    );
  };

  const deleteExercise = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    // save to localstorage
    window.localStorage.setItem(
      "exercises",
      JSON.stringify(newList.filter((e) => e.type === "local"))
    );
    setList(newList);
  };

  return (
    <ExercisesContext.Provider
      value={{
        list,
        isLoaded,
        getExercises,
        editExercise,
        createExercise,
        deleteExercise,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
}
