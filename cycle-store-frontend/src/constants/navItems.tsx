import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home";
import Shop from "../pages/Shop/Shop";
import Account from "../pages/user/Account";
import { TNavItems } from "../types";

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
