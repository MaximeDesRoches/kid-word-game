import { useContext } from "react";
import ExerciseForm from "../forms/ExercicseForm";
import { ExercisesContext, IExercise } from "../../context/ExercisesContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { createExercise } = useContext(ExercisesContext);
  const navigate = useNavigate();

  function handleCreate(exercise: IExercise) {
    createExercise(exercise);
    navigate("/");
  }

  return (
    <div className="container form create">
      <div className="row">
        <div className="col-12">
          <h1>Nouvel Exercice</h1>
        </div>
      </div>

      <ExerciseForm onSubmit={handleCreate} />
    </div>
  );
}
