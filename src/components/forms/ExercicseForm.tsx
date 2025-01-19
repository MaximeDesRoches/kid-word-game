import { useState } from "react";
import { IExercise } from "../../context/ExercisesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ExerciseForm({
  exercise = {
    id: "",
    name: "",
    language: "fr-CA",
    type: "local",
    words: [],
  },
  onSubmit,
}: {
  exercise?: IExercise;
  onSubmit: (exercise: IExercise) => void;
}) {
  const [form, setForm] = useState<IExercise>(structuredClone(exercise));
  const [newWord, setNewWord] = useState("");
  const [newTextToSpeech, setNewTextToSpeech] = useState("");
  const navigate = useNavigate();

  const isNewFilled = newWord && newTextToSpeech;
  const isNewBothEmpty = !newWord && !newTextToSpeech;
  const hasChanges =
    JSON.stringify(exercise) !== JSON.stringify(form) || isNewFilled;
  const hasTitle = form.name.trim().length > 0;
  const hasWords = form.words.length > 0 || isNewFilled;
  const canSave =
    hasChanges && hasTitle && hasWords && (isNewFilled || isNewBothEmpty);

  function onSave() {
    const words = form.words.map(({ word, textToSpeech }) => {
      return { textToSpeech, word: word.trim().toLocaleLowerCase() };
    });

    if (isNewFilled) {
      words.push({
        word: newWord.trim().toLocaleLowerCase(),
        textToSpeech: newTextToSpeech,
      });
    }

    onSubmit({
      ...form,
      words,
    });
  }

  return (
    exercise && (
      <>
        <div className="row">
          <div className="col-12">
            <label>
              <div>Titre</div>
              <input
                type="text"
                value={form.name}
                onChange={(e) => {
                  setForm((v) => ({ ...v, name: e.target.value }));
                }}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h2>Mots</h2>
          </div>
        </div>
        <div className="row word new">
          <div className="col-5">Mot</div>
          <div className="col-5">Texte a lire</div>
          <div className="col-2"></div>
        </div>
        {form.words.map((word, index) => (
          <div key={index} className="row word">
            <div className="col-5">
              <input
                placeholder="Mot"
                type="text"
                value={word.word}
                onChange={(e) => {
                  setForm((v) => {
                    const words = [...v.words];
                    words[index].word = e.target.value;
                    return { ...v, words };
                  });
                }}
              />
            </div>
            <div className="col-5">
              <input
                placeholder="Texte à lire"
                type="text"
                value={word.textToSpeech}
                onChange={(e) => {
                  setForm((v) => {
                    const words = [...v.words];
                    words[index].textToSpeech = e.target.value;
                    return { ...v, words };
                  });
                }}
              />
            </div>
            <div className="col-2">
              <button
                title="Supprimer le mot"
                className="card hoverable"
                onClick={() => {
                  setForm((v) => {
                    const words = [...v.words];
                    words.splice(index, 1);
                    return { ...v, words };
                  });
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
        <div key={"new"} className="row word new">
          <div className="col-5">
            <input
              placeholder="Mot"
              type="text"
              value={newWord}
              onChange={(e) => {
                setNewWord(e.target.value);
              }}
            />
          </div>
          <div className="col-5">
            <input
              placeholder="Texte à lire"
              type="text"
              value={newTextToSpeech}
              onChange={(e) => {
                setNewTextToSpeech(e.target.value);
              }}
            />
          </div>
          <div className="col-2">
            {newWord && newTextToSpeech ? (
              <button
                className="card hoverable"
                onClick={() => {
                  setForm((v) => {
                    return {
                      ...v,
                      words: [
                        ...v.words,
                        { word: newWord, textToSpeech: newTextToSpeech },
                      ],
                    };
                  });
                  setNewWord("");
                  setNewTextToSpeech("");
                }}
                title="Ajouter un mot"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : null}
          </div>
        </div>
        <div className="btns row">
          <div className="col-12">
            <div className="ctn">
              <button
                className={`card save ${canSave ? "hoverable" : "disabled"}`}
                onClick={onSave}
              >
                <FontAwesomeIcon icon={faSave} /> Sauvegarder
              </button>
              <button
                className="card cancel hoverable"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faTimes} /> Annuler
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
