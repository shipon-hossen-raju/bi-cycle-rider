import { createBrowserRouter } from "react-router";
import { navItems } from "../constants/navItems";
import { appRoutesGenerators } from "../generators/navItems.generators";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: appRoutesGenerators(navItems),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default appRoutes;
