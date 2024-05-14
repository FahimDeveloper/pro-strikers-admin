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
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
