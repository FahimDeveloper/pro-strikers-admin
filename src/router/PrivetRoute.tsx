import { ReactNode } from "react";
import { useAppSelector } from "../hooks/useAppHooks";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  if (!user && !token) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default PrivetRoute;
