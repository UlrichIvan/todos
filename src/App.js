import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Todos from "./pages/todos/Todos";
import AboutTodo from "./pages/todos/AboutTodo";
import NotFound from "./pages/NotFound";
import { SIGN_UP_PAGE, HOME_PAGE, TODOS_PAGE, NOT_FOUND } from "../src/constants"
import AuthProvider from "./providers/AuthProvider";
import TodoProvider from "./providers/TodoProvider.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME_PAGE}>
          <Route index element={
            <AuthProvider>
              <SignIn />
            </AuthProvider>} />
          <Route path={SIGN_UP_PAGE} element={
            <AuthProvider>
              <SignUp />
            </AuthProvider>} />
          <Route path={TODOS_PAGE} element={
            <AuthProvider>
              <Todos />
            </AuthProvider>}>
          </Route>
          <Route path={`${TODOS_PAGE}/:id`} element={
            <TodoProvider>
              <AboutTodo />
            </TodoProvider>}
          />
        </Route>
        <Route path={NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
