import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<main className="main-wrapper">
			<div className="component-wrapper">
				<Outlet />
			</div>
		</main>
	);
}
