import { memo, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExercises";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRotateLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useVoice from "../../hooks/useVoice";
import { EXCLAMATIONS, ROUTES } from "../../Constants";
import randomArrayItem from "../../utils/randomArrayItem";
import TextToSpeechButton from "../ui/TextToSpeechButton";
import Progress from "../ui/Progress";

function Exercise({ hasHint = true }: { hasHint: boolean }) {
  const { id } = useParams();
  const { exercise } = useExercise(id);
  const { say } = useVoice(exercise?.language);
  const { words } = exercise || {};
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words && words[currentWordIndex];
  const [showWord, setShowWord] = useState(!hasHint);
  const ref = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    ref.current?.focus();

    const onClick = () => {
      ref.current?.focus();
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  const onClickReset = () => {
    setInput("");
    ref.current?.focus();
  };

  const blocks =
    currentWord &&
    Array.from({ length: currentWord.word.length }).map((_, index) => {
      const letter = input[index] || (index === input.length ? "_" : "");
      return (
        <div
          key={index}
          className={`card block ${
            currentWord.word[index] === " " ? "space" : ""
          }`}
        >
          {letter}
        </div>
      );
    });

  const onSubmit = () => {
    if (!currentWord) return;

    if (currentWord.word === input) {
      say(randomArrayItem(EXCLAMATIONS.SUCCESS));
      setInput("");
      setCurrentWordIndex((v) => v + 1);
    } else {
      say(randomArrayItem(EXCLAMATIONS.FAILURE));
    }
  };

  return (
    exercise && (
      <div className="exercise">
        <Progress index={currentWordIndex} total={words?.length || 0} />
        {currentWord && (
          <>
            <div className="card hint">
              <span>
                {showWord
                  ? currentWord.word
                  : currentWord.word.replace(/./g, "-")}
              </span>
              <TextToSpeechButton
                language={exercise.language}
                word={currentWord.textToSpeech || currentWord.word}
              />
              <span className="icon">
                <FontAwesomeIcon
                  icon={showWord ? faEyeSlash : faEye}
                  onClick={() => setShowWord((v) => !v)}
                />
              </span>
            </div>
            <div className="answer">
              <input
                ref={ref}
                title="answer"
                className="hidden"
                maxLength={currentWord.word.length || 0}
                type="text"
                value={input}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                onChange={(e) => setInput(e.currentTarget.value)}
                autoFocus
                autoCapitalize="off"
              />

              <div className="blocks">
                {blocks}
                <div className="card block reset" onClick={onClickReset}>
                  <FontAwesomeIcon icon={faArrowRotateLeft} />
                </div>
                <div className="card block listen">
                  <TextToSpeechButton
                    word={input}
                    language={exercise.language}
                  />
                </div>
              </div>
            </div>
            {input.length === currentWord.word.length && (
              <button onClick={onSubmit} className="card done-button">
                Terminé!
              </button>
            )}
          </>
        )}
        {!currentWord && (
          <div className="end-frame">
            <div className="card">
              Félicitations! Tu as terminé cet exercice.
            </div>
            <div className="btns">
              <Link className="card hoverable return" to={ROUTES.ROOT}>
                <FontAwesomeIcon icon={faArrowLeft} /> Retour
              </Link>
              <a
                className="card hoverable restart"
                onClick={() => setCurrentWordIndex(0)}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} /> Recommencer
              </a>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default memo(Exercise);
