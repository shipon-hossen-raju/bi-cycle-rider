import { TAdminRoute, TNavItems } from "../types";

export const navItemsGenerators = (navItems: TNavItems[]) => {
  return navItems.map((navItem) => {
    return {
      id: navItem.id,
      name: navItem.name,
      path: navItem.path,
    };
  });
};

export const adminNavItemsGenerators = (navItems: TAdminRoute[]) => {
  return navItems
    .map((item) => {
      if (item?.name || item?.icon) {
        return {
          id: item.id,
          name: item?.name,
          path: item.path,
          icon: item?.icon,
        };
      }
    })
    .filter(Boolean);
};

export const appRoutesGenerators = (navItems: TNavItems[]) => {
  return navItems.map((navItem) => {
    return {
      path: navItem.path,
      element: navItem.element,
    };
  });
};
