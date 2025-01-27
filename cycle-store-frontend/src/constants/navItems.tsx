import Dashboard from "@/pages/dashboard/Dashboard";
import {
  dashboardIcon,
  ordersIcon,
  productsIcon,
} from "@/assets/icons/dashboard.icons";
import Products from "@/pages/dashboard/Products/Products";
import Orders from "@/pages/dashboard/Orders/Orders";
import { TAdminRoute, TNavItems } from "@/types";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop/Shop";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Account from "@/pages/user/Account";

export const navItems: TNavItems[] = [
  {
    id: "1-home",
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    id: "2-shop",
    name: "Shop",
    path: "/shop",
    element: <Shop />,
  },
  {
    id: "3-about",
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    id: "4-contact",
    name: "Contact",
    path: "/contact",
    element: <Contact />,
  },
  {
    id: "5-account",
    path: "/account",
    element: <Account />,
  },
];

export const adminNavItems: TAdminRoute[] = [
  {
    id: "1-dashboard",
    name: "Dashboard",
    path: "/dashboard",
    icon: dashboardIcon,
    element: <Dashboard />,
  },
  {
    id: "2-products",
    name: "Products",
    path: "/dashboard/products",
    icon: productsIcon,
    element: <Products />,
  },
  {
    id: "3-orders",
    name: "Orders",
    path: "/dashboard/orders",
    icon: ordersIcon,
    element: <Orders />,
  },
];
