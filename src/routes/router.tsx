import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense";
import AllExpense from "../pages/AllExpense";
import UpdateExpense from "../pages/UpdateExpense";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/dashboard/add-expense",
                element: <AddExpense />
            },
            {
                path: "/dashboard/all-expense",
                element: <AllExpense />
            },
            {
                path: "/:id",
                element: <UpdateExpense />
            }
        ]
    },
])

export default router;