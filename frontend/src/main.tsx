import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Index as UserIndex } from "./User/Index";
import { Index as TopIndex } from "./Top/Index";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { Test } from "./Auth/Test";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/app",
        element: <TopIndex />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <UserIndex />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
