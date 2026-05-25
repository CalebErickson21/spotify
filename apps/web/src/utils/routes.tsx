// Import dependencies
import { createBrowserRouter } from "react-router-dom";

// Import pages
import Layout from "../pages/layout";
import Home from "../pages/home";
import Construction from "../pages/construction";
import Login from "../pages/login";
import Register from "../pages/register";


const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "/construction",
            element: <Construction />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        }
        ],
    },
]);

// Export router
export default router;