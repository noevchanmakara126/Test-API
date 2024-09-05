import React from "react";
import App from "./App";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <App />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
