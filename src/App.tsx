import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./Constants";
import "./css/index.scss";
import Home from "./components/routes/Home";
import Layout from "./components/Layout";
import ExerciseLevel from "./components/routes/ExerciseLevel";
import { ExerciseLevels } from "./hooks/useExercises";
import Exercise from "./components/routes/Exercise";
import Edit from "./components/routes/Edit";
import Create from "./components/routes/Create";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.EXERCISE} element={<ExerciseLevel />}>
          <Route
            path={ExerciseLevels.EASY}
            element={<Exercise hasHint={false} />}
          />
          <Route
            path={ExerciseLevels.HARD}
            element={<Exercise hasHint={true} />}
          />
        </Route>
        <Route path={ROUTES.EDIT} element={<Edit />} />
        <Route path={ROUTES.CREATE} element={<Create />} />
      </Route>
    </Routes>
  );
}

export default App;
