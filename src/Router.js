import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";
import { getItem } from "./localStorage";
import { useEffect, useState } from "react";

export default function Router() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(getItem("access_token", null));
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/signin" replace></Navigate> : <Signin />
          }
        />
        <Route
          path="/signin"
          element={
            token ? (
              <Navigate to="/todo" replace></Navigate>
            ) : (
              <Signin setToken={setToken} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            token ? <Navigate to="/todo" replace></Navigate> : <Signup></Signup>
          }
        />
        <Route
          path="/todo"
          element={
            token ? (
              <Todo token={token} />
            ) : (
              <Navigate to="/signin" replace></Navigate>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
