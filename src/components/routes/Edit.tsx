import { useNavigate, useParams } from "react-router-dom";
import { useExercise } from "../../hooks/useExercises";
import ExerciseForm from "../forms/ExercicseForm";
import { ExercisesContext, IExercise } from "../../context/ExercisesContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Edit() {
  const { editExercise, deleteExercise } = useContext(ExercisesContext);
  const { id } = useParams<{ id: string }>();
  const { exercise } = useExercise(id);
  const navigate = useNavigate();

  function handleSubmit(exercise: IExercise) {
    editExercise(exercise);
    navigate("/");
  }

  function handleDelete() {
    if (!exercise) return;

    if (confirm("Voulez-vous vraiment supprimer cet exercice?")) {
      deleteExercise(exercise.id);
    }
    navigate("/");
  }

  return (
    exercise && (
      <div className="container form edit">
        <div className="row">
          <div className="col-12 header">
            <h1>Modifier Exercice</h1>
            <div className="card hoverable" onClick={handleDelete}>
              <FontAwesomeIcon className="icon" icon={faTrash} />
            </div>
          </div>
        </div>
        <ExerciseForm exercise={exercise} onSubmit={handleSubmit} />
      </div>
    )
  );
}
