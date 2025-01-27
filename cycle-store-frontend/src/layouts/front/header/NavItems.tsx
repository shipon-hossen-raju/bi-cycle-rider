import { Link } from "react-router";
import { navItems } from "../../../constants/navItems";
import { navItemsGenerators } from "../../../generators/navItems.generators";

export default function NavItems() {
  const navData = navItemsGenerators(navItems);
  //   console.log("navData", navData);
  return (
    <>
      <nav>
        {navData.map((navItem) => (
          <Link
            key={navItem.id}
            to={navItem.path}
            className="text-gray-600 hover:text-gray-800 px-4"
          >
            {navItem.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
