import { ROUTES } from "../../Constants";
import useExercises from "../../hooks/useExercises";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

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
            {isLoaded &&
              exercises.map((exercise) => {
                return (
                  <NavLink
                    to={ROUTES.EXERCISE.replace(":id", exercise.id.toString())}
                    key={exercise.id}
                    className="card hoverable exercise-card"
                  >
                    <div className="title">{exercise.name}</div>

                    {exercise.type === "local" ? (
                      <NavLink
                        to={ROUTES.EDIT.replace(":id", exercise.id)}
                        className="edit-btn"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </NavLink>
                    ) : null}
                  </NavLink>
                );
              })}
          </div>
        </div>
      </div>
      <NavLink to={ROUTES.CREATE} className="card new-exercise hoverable">
        <FontAwesomeIcon icon={faPlus} /> Nouvel Exercice
      </NavLink>
    </div>
  );
}
