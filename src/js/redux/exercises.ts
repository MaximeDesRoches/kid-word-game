import { createSlice } from '@reduxjs/toolkit';
import { CDN_BASE } from '../Constants';
import { getJSON } from './async/api';
import createDebouncedAsyncAction from './async/createDebouncedAsyncAction';

type IExercise = {
	id: number,
	name: string,
	language: string,
	words: string[],
}

type IExercisesState = {
	list: IExercise[],
	loaded: boolean,
}

export const getExercises = createDebouncedAsyncAction<IExercisesState>(
	'exercises/getExercises',
	() => {
		return getJSON(CDN_BASE + '/assets/exercises.json?v=' + Date.now());
	},
	{
		fulfilled: (state, action) => {
			return {
				...state,
				list: action.payload as IExercise[],
				loaded: true,
			};
		},
	},
);

const exercises = createSlice({
	name: 'exercises',
	reducers: {},
	extraReducers: {
		...getExercises.reducers,
	},
	initialState: {
		list: [],
		loaded: false,
	} as IExercisesState,
});

export default exercises;
