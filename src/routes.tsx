import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import BlogPage from "@/pages/blog.tsx";

const router = createBrowserRouter([
      {
        path: "/",
        Component: HomePage,
      },
    {
        path: "/blogs/*",
        Component: BlogPage,
    },
      {
        path: "*",
        element: <>NOT FOUND</>,
      },
]);

// Minimal functional component
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
