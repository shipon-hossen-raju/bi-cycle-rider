import { createBrowserRouter } from "react-router";
import { navItems } from "../constants/navItems";
import { appRoutesGenerators } from "../generators/navItems.generators";
import MainLayout from "../layouts/MainLayout";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: appRoutesGenerators(navItems),
  },
]);

export default appRoutes;
