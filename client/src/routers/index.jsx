import { createBrowserRouter } from "react-router";

import { MainLayout } from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";

import EditBook from "../pages/EditBook.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit-book",
        element: <EditBook />,
      },
    ],
  },
]);

export default router;
