import { ReactNode } from "react";
import { useAppSelector } from "../hooks/useAppHooks";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  if (user && token) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  } else {
    return children;
  }
};

export default ProtectRoute;
