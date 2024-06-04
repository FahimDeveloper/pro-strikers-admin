import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { superAdminPaths } from "./super-admin.routes";
import { adminPaths } from "./admin.routes";
import ProtectRoute from "./ProtectRoute";
import PrivetRoute from "./PrivetRoute";
import SendResetMail from "../pages/SendResetMail/SendResetMail";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Login />
      </ProtectRoute>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <ProtectRoute>
        <SendResetMail />
      </ProtectRoute>
    ),
  },
  {
    path: "/:id/:token",
    element: (
      <ProtectRoute>
        <ResetPassword />
      </ProtectRoute>
    ),
  },
  {
    path: "/:id/:token/verify",
    element: (
      <ProtectRoute>
        <VerifyCode />
      </ProtectRoute>
    ),
  },
  {
    path: "/super-admin",
    element: (
      <PrivetRoute>
        <App />
      </PrivetRoute>
    ),
    children: routesGenerator(superAdminPaths),
  },
  {
    path: "/admin",
    element: (
      <PrivetRoute>
        <App />
      </PrivetRoute>
    ),
    children: routesGenerator(adminPaths),
  },
]);

export default router;
