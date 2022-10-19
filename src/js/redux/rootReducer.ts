
import app from './app';
import exercises from './exercises';

export const rootReducer = {
	app: app.reducer,
	exercises: exercises.reducer,
};
