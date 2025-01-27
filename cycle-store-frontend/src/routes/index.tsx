import { createBrowserRouter } from "react-router";
import { adminNavItems, navItems } from "../constants/navItems";
import { appRoutesGenerators } from "../generators/navItems.generators";
import MainLayout from "../layouts/front/MainLayout";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import AdminDashboard from "@/layouts/dashboard/AdminDashboard";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: appRoutesGenerators(navItems),
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    children: appRoutesGenerators(adminNavItems),
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
