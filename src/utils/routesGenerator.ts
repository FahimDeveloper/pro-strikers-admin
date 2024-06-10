import { ReactNode } from "react";
import { TPath } from "../types/path.type";

type TRoute = {
  path: string;
  element: ReactNode;
};

export const routesGenerator = (routesPath: TPath[]) => {
  const routes = routesPath.reduce((acc: TRoute[], route) => {
    if (route.path && route.element) {
      acc.push({
        path: route.path,
        element: route.element,
      });
    }
    if (route.children) {
      route.children.forEach((child) => {
        if (child.path && child.element) {
          acc.push({
            path: child.path!,
            element: child.element,
          });
        }
        if (child.children) {
          child.children.forEach((grandChild) => {
            if (grandChild.path && grandChild.element) {
              acc.push({
                path: grandChild.path!,
                element: grandChild.element,
              });
            }
          });
        }
      });
    }
    return acc;
  }, []);
  return routes;
};
