import React from "react";
import { GlobalStyle } from "@/styles";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </>
  );
}

export default App;
