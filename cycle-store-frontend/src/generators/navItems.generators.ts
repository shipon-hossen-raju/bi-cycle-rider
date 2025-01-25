import { TNavItems } from "../types";

export const navItemsGenerators = (navItems: TNavItems[]) => {
  return navItems.map((navItem) => {
    return {
      id: navItem.id,
      name: navItem.name,
      path: navItem.path,
    };
  });
};

export const appRoutesGenerators = (navItems: TNavItems[]) => {
  return navItems.map((navItem) => {
    return {
      path: navItem.path,
      element: navItem.element,
    };
  });
};
