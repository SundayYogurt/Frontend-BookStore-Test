import { createBrowserRouter } from "react-router";

import { MainLayout } from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";

import EditBook from "../pages/EditBook.jsx";
import NewBook from "../pages/NewBook.jsx";
import NewJournal from "../pages/NewJournal.jsx";
import EditJournal from "../pages/EditJournal.jsx";
import EditComic from "../pages/EditComic.jsx";
import NewComic from "../pages/NewComic.jsx";
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
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/add-book",
        element: <NewBook />,
      },
      {
        path: "/edit-comic/:id",
        element: <EditComic />,
      },
      {
        path: "/add-comic",
        element: <NewComic />,
      },
      {
        path: "/add-journal",
        element: <NewJournal />,
      },
      {
        path: "/edit-journal/:id",
        element: <EditJournal />,
      },
    ],
  },
]);

export default router;
