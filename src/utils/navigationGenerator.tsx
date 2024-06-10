import { NavLink } from "react-router-dom";
import { TPath } from "../types/path.type";

type TSidebarMenu = {
  key: string;
  label: JSX.Element | string;
  children?: TSidebarMenu[];
};

export const navigationGenerator = (navigationsPath: TPath[], role: string) => {
  const navigations = navigationsPath.reduce(
    (acc: TSidebarMenu[], route: TPath) => {
      if (route.path && route.name) {
        acc.push({
          key: `${role}/${route.path}`,
          label: <NavLink to={`/${role}/${route.path}`}>{route.name}</NavLink>,
        });
      }
      if (route.name && route.children) {
        acc.push({
          key: `${role}/${route.name}`,
          label: route.name,
          children: route.children.map((child) => {
            if (child.name && child.children) {
              return {
                key: `${role}/${child.path}`,
                label: child.name,
                children: child.children.map((grandChild) => {
                  return {
                    key: `${role}/${grandChild.path}`,
                    label: (
                      <NavLink to={`/${role}/${grandChild.path}`}>
                        {grandChild.name}
                      </NavLink>
                    ),
                  };
                }),
              };
            } else {
              return {
                key: `${role}/${child.path}`,
                label: (
                  <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                ),
              };
            }
          }),
        });
      }
      return acc;
    },
    []
  );
  return navigations;
};
