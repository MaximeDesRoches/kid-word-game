import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExercises";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRotateLeft, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import useVoice from "../../hooks/useVoice";
import { EXCLAMATIONS, ROUTES } from "../../Constants";
import randomArrayItem from "../../utils/randomArrayItem";


function EasyExercise() {
	const { id } = useParams();
	const { exercise } = useExercise(id ? parseInt(id) : null);

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
			console.log(utterance);
			utterance.lang = exercise?.language || "en-US";
			utterance.voice = voice;
			utterance.rate = 0.9;
			speechSynthesis.speak(utterance);
		}
	}, [voice]);

	const onClickWord = useCallback(() => {
		if (!currentWord) return;

		sayWord(currentWord.textToSpeech || currentWord.word);
		ref.current?.focus();
	}, [currentWord]);

	const onClickReset = () => {
		setInput("");
		ref.current?.focus();
	}

	const blocks = currentWord && Array.from({ length: currentWord.word.length }).map((_, index) => {
		const letter = input[index] || (index === input.length ? '_' : '');
		return (
			<div key={index} className={`card block ${currentWord.word[index] === ' ' ? 'space' : ''}`}>
				{letter}
			</div>
		);
	});

	const onSubmit = useCallback(() => {
		if (!currentWord) return;

		if (currentWord.word === input) {
			sayWord(randomArrayItem(EXCLAMATIONS.SUCCESS));
			setInput("");
			setCurrentWordIndex(v => v + 1);
		} else {
			sayWord(randomArrayItem(EXCLAMATIONS.FAILURE));
		}
	}, [currentWord, input, sayWord]);
	
	return exercise && (
		<div className="easy-exercise">
			{ currentWord && 
				<>
					<div className="card hint" onClick={onClickWord}>
						{currentWord.word} <span className="icon"><FontAwesomeIcon onClick={() => sayWord(currentWord.textToSpeech || currentWord.word)} icon={faBullhorn} /></span>
					</div>
					<div className="answer">
						<input ref={ref} title="answer" className="hidden" maxLength={currentWord.word.length || 0} type="text" value={input} onKeyDown={(e) => e.key === 'Enter' && onSubmit()} onChange={(e) => setInput(e.currentTarget.value)} autoFocus autoCapitalize="off" />

						<div className="blocks">
							{blocks}
							<div className="card block reset" onClick={onClickReset}><FontAwesomeIcon icon={faArrowRotateLeft} /></div>
							<div className="card block listen" onClick={() => sayWord(input)}><FontAwesomeIcon icon={faBullhorn} /></div>
						</div>
					</div>
					{input.length === currentWord.word.length && <button onClick={onSubmit} className="card done-button">Terminé!</button>}
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