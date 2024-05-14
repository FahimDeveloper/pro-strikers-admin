import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { superAdminRoutes } from "./super-admin.routes";
import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/super-admin",
    element: <App />,
    children: routesGenerator(superAdminRoutes),
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminRoutes),
  },
]);

export default router;
