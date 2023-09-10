import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExercises";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateLeft, faBullhorn } from '@fortawesome/pro-regular-svg-icons';
import useVoice from "../../hooks/useVoice";
import { EXCLAMATIONS, ROUTES } from "../../Constants";
import randomArrayItem from "../../utils/randomArrayItem";

type EasyExerciseProps = {
	id: number;
}

function EasyExercise() {
	const { id } = useParams();
	const { exercise } = useExercise(parseInt(id));

	const { words } = exercise || {};
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const currentWord = words && words[currentWordIndex];
	
	const ref = useRef<HTMLInputElement>(null);

	const [input, setInput] = useState("");

	const voice = useVoice(exercise?.language);

	useEffect(() => {
		ref.current?.focus();

		const onClick = () => {
			ref.current?.focus();
		};
		
		window.addEventListener('click', onClick);

		return () => {
			window.removeEventListener('click', onClick);
		}
	});

	const sayWord = useCallback((word:string) => {
		if (voice) {
			const utterance = new SpeechSynthesisUtterance(word || "");
			utterance.lang = exercise?.language || "en-US";
			utterance.voice = voice;
			utterance.rate = 0.8;
			speechSynthesis.speak(utterance);
		}
	}, [voice]);

	const onClickWord = useCallback(() => {
		sayWord(currentWord);
		ref.current?.focus();
	}, [currentWord]);

	const onClickReset = () => {
		setInput("");
		ref.current?.focus();
	}

	const blocks = currentWord && Array.from({ length: currentWord.length }).map((_, index) => {
		const letter = input[index] || (index === input.length ? '_' : '');
		return (
			<div key={index} className={`card block ${currentWord[index] === ' ' ? 'space' : ''}`}>
				{letter}
			</div>
		);
	});

	const onSubmit = useCallback(() => {
		if (currentWord === input) {
			sayWord(randomArrayItem(EXCLAMATIONS.SUCCESS));
			setInput("");
			setCurrentWordIndex(v => v + 1);
		} else {
			sayWord(randomArrayItem(EXCLAMATIONS.FAILURE));
		}
	}, [currentWord, input]);
	
	return exercise && (
		<div className="easy-exercise">
			{ currentWord && 
				<>
					<div className="card hint" onClick={onClickWord}>
						{currentWord} <span className="icon"><FontAwesomeIcon onClick={() => sayWord(currentWord)} icon={faBullhorn} /></span>
					</div>
					<div className="answer">
						<input ref={ref} title="answer" className="hidden" maxLength={currentWord?.length || 0} type="text" value={input} onKeyDown={(e) => e.key === 'Enter' && onSubmit()} onChange={(e) => setInput(e.currentTarget.value)} autoFocus />

						<div className="blocks">
							{blocks}
							<div className="card block reset" onClick={onClickReset}><FontAwesomeIcon icon={faArrowRotateLeft} /></div>
							<div className="card block listen" onClick={() => sayWord(input)}><FontAwesomeIcon icon={faBullhorn} /></div>
						</div>
					</div>
					{input.length === currentWord.length && <button onClick={onSubmit} className="card done-button">Terminé!</button>}
				</>
			}
			{!currentWord && (
				<div className="end-frame">
					<div className="card">Félicitations! Tu as terminé cet exercice.</div>
					<div className="btns">
						<Link className="card hoverable return" to={ROUTES.ROOT}><FontAwesomeIcon icon={faArrowLeft} /> Retour</Link>
						<a className="card hoverable restart" onClick={() => setCurrentWordIndex(0)}><FontAwesomeIcon icon={faArrowRotateLeft} /> Recommencer</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default memo(EasyExercise);