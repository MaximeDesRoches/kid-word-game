import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ROUTES } from "../../Constants";
import { ExerciseLevels, useExercise } from "../../hooks/useExercises";

function ExerciseLevel() {
  const { id = "" } = useParams();
  const isLevelSelection = useMatch(ROUTES.EXERCISE);

  const { exercise, isLoaded } = useExercise(id);

  const navigate = useNavigate();

  if (!id || id === ":id" || (!exercise && isLoaded)) {
    requestAnimationFrame(() => {
      navigate(ROUTES.ROOT);
    });
  }

  return (
    id &&
    exercise && (
      <div className="exercise-level">
        <div className="container">
          <div className="col-12">
            <h1 className="title">
              {exercise.name}{" "}
              <Link to={ROUTES.ROOT} className="card back hoverable">
                <FontAwesomeIcon icon={faArrowLeft} /> Retour
              </Link>
            </h1>
            {isLevelSelection && (
              <div className="levels">
                {Object.entries(ExerciseLevels).map(([code, level]) => (
                  <Link
                    to={
                      ROUTES.EXERCISE.replace(":id", id) +
                      "/" +
                      ROUTES.DIFFICULTY.replace(":difficulty", level).replace(
                        ":level",
                        level
                      )
                    }
                    className={`card hoverable level-card level-card-${code.toLowerCase()}`}
                    key={code}
                  >
                    <div className="title">{level}</div>
                  </Link>
                ))}
              </div>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    )
  );
}

export default memo(ExerciseLevel);
