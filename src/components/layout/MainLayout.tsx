import { Layout, theme } from "antd";
import Sidebar from "./sidebar";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [locationKey, setLocationKey] = useState<string>("admin/dashboard");
  useMemo(() => {
    setLocationKey(location.pathname.slice(1, 100));
  }, [location.pathname]);
  const user = useSelector(selectCurrentUser);
  return (
    <Layout className="h-screen">
      <Sidebar locationKey={locationKey} />
      <Layout style={{ marginLeft: 265 }}>
        <Header
          style={{
            padding: 0,
            paddingRight: 25,
            height: 60,
            background: "white",
          }}
          className="flex justify-end"
        >
          <Link
            className="flex justify-center items-center"
            to={`/${user?.role}/profile`}
          >
            <img
              src={user?.image}
              className="size-12 object-cover rounded-full"
            />
          </Link>
        </Header>
        <Content
          style={{
            margin: "5px 0",
            marginRight: "5px",
            padding: 20,
            paddingBottom: 10,
            overflowY: "auto",
            background: "white",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
