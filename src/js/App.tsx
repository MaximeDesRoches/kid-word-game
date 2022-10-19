import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './Constants';
import '../css/index.scss';
import Home from './components/routes/Home';
import Layout from './components/Layout';

function App() {
	return (
		<Routes>
			<Route path={ROUTES.ROOT} element={<Layout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
