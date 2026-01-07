import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home";
import BlogPage from "@/pages/blog.tsx";
import NotFound from "@/pages/not-found.tsx";

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
        Component: NotFound,
      },
]);

// Minimal functional component
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
