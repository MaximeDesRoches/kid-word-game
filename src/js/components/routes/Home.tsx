import React, { useEffect } from 'react';
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
								<div key={exercise.id} className="card exercise-card">
									<div className="title">{exercise.name}</div>

									<div className="words">
										{exercise.words.map((word) => <div className="word" key={word}>{word}</div>)}
									</div>

									<Link to={ROUTES.EXERCISE.replace(':id', exercise.id.toString())}>
										Pratiquer
									</Link>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
