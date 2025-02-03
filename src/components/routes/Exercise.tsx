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
import { ROUTES } from "../../Constants";
import TextToSpeechButton from "../ui/TextToSpeechButton";
import Progress from "../ui/Progress";
import { useGlobalAudioPlayer } from "react-use-audio-player";

function Exercise({ hasHint = true }: { hasHint: boolean }) {
  const { id } = useParams();
  const { exercise } = useExercise(id);
  const { words } = exercise || {};
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words && words[currentWordIndex];
  const [showWord, setShowWord] = useState(!hasHint);
  const ref = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const { load } = useGlobalAudioPlayer();

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
      load("./assets/sounds/win.mp3", { autoplay: true, initialVolume: 0.5 });
      setInput("");
      setCurrentWordIndex((v) => v + 1);
    } else {
      load("./assets/sounds/error.mp3", { autoplay: true, initialVolume: 0.5 });
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

              <div className="blocks">{blocks}</div>
            </div>
            <div className="btns">
              <div className="card block reset" onClick={onClickReset}>
                <FontAwesomeIcon icon={faArrowRotateLeft} /> Réinitialiser
              </div>
              <TextToSpeechButton
                word={currentWord.word}
                language={exercise.language}
              />
              <div
                className="card block hint"
                onClick={() => setShowWord((v) => !v)}
              >
                <FontAwesomeIcon icon={showWord ? faEyeSlash : faEye} />{" "}
                {showWord ? "Cacher" : "Afficher"}
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
