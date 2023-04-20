import { createBrowserRouter } from "react-router-dom";
import { Login, SignUp, Root } from "@/pages";
import { LOGIN_URL, LOGOUT_URL, MAIN_URL, SIGN_UP_URL } from "@/constants";
import React from "react";

const router = createBrowserRouter([
  {
    path: MAIN_URL,
    element: <Root />,
  },
  {
    path: LOGOUT_URL,
  },
  {
    path: LOGIN_URL,
    element: <Login />,
  },
  {
    path: SIGN_UP_URL,
    element: <SignUp />,
  },
]);

export default router;
