import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ConfessionForm from "./ConfessionForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import YourSubmite from "./YourSubmite.jsx";
import Layout from "./Layout.jsx";
import Homepage from "./Homepage.jsx";
import Submitted from "./Submitted.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/confess",
        element: <ConfessionForm />,
      },
      {
        path: "/yoursubmited",
        element: <YourSubmite />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
