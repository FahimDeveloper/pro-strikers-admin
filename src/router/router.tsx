import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { superAdminPaths } from "./super-admin.routes";
import { adminPaths } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/super-admin",
    element: <App />,
    children: routesGenerator(superAdminPaths),
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminPaths),
  },
]);

export default router;
