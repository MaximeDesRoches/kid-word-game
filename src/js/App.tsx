import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Constants';
import '../css/index.scss';
import Home from './components/routes/Home';
import Layout from './components/Layout';
import Exercise from './components/routes/Exercise';
import { ExerciseLevels } from './hooks/useExercises';
import EasyExercise from './components/routes/EasyExercise';

function App() {
	return (
		<Routes>
			<Route path={ROUTES.ROOT} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={ROUTES.EXERCISE} element={<Exercise />}>
					<Route path={ExerciseLevels.EASY} element={<EasyExercise />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
