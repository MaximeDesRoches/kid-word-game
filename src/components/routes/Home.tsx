import { Link } from 'react-router-dom';
import { ROUTES } from '../../Constants';
import useExercises from '../../hooks/useExercises';

export default function Home() {
	const { list: exercises, isLoaded } = useExercises();

	return (
		<div className="container">
			<div className="row home-wrapper">
				<div className="col-12">
					<h1 className="title">Pratiquer les mots</h1>
				</div>
				<div className="col-12">
					<div className="exercise-grid">
						{isLoaded && exercises.map((exercise) => {
							return (
								<Link to={ROUTES.EXERCISE.replace(':id', exercise.id.toString())} key={exercise.id} className="card hoverable exercise-card">
									<div className="title">{exercise.name}</div>

									<div className="button">
										Pratiquer
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
