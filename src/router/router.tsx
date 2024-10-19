/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import LazyLoad from "../components/common/LozyLoad";
import { lazy } from "react";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { superAdminPaths } from "./super-admin.routes";
import { adminPaths } from "./admin.routes";
import ProtectRoute from "./ProtectRoute";
import PrivetRoute from "./PrivetRoute";
const Login = LazyLoad(lazy(() => import("../pages/Login/Login")));
const SendResetMail = LazyLoad(
  lazy(() => import("../pages/SendResetMail/SendResetMail"))
);
const VerifyCode = LazyLoad(
  lazy(() => import("../pages/VerifyCode/VerifyCode"))
);
const ResetPassword = LazyLoad(
  lazy(() => import("../pages/ResetPassword/ResetPassword"))
);
// import { trainerPaths } from "./trainer.routes";

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
  // {
  //   path: "/trainer",
  //   element: (
  //     <PrivetRoute>
  //       <App />
  //     </PrivetRoute>
  //   ),
  //   children: routesGenerator(trainerPaths),
  // },
]);

export default router;
