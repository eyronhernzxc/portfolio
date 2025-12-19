import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import { InfyHowToUse } from "./pages/blogs/reactify";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/reactor-blog",
    Component: InfyHowToUse,
  },
  {
    path: "*",
    element: <>NOT FOUND</>,
  },
]);

// Minimal functional component
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
