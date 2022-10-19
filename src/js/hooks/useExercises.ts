import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../redux/config/store";
import { getExercises } from "../redux/exercises";

export enum ExerciseLevels {
	EASY = "facile",
	NORMAL = "moyen",
	HARD = "difficile",
}

export default function useExercises() {
	const dispatch = useAppDispatch();
	const { list, loaded } = useSelector((state: IRootState) => state.exercises);

	useEffect(() => {
		if (!loaded) {
			dispatch(getExercises());
		}
	}, [loaded]);

	return {
		list,
		isLoaded: loaded
	}
}

export function useExercise(id: number) {
	const { list, isLoaded } = useExercises();
	return {
		exercise: id != undefined && list.find(exercise => exercise.id === id),
		isLoaded
	};
}