import { Button, Layout, theme } from "antd";
import Sidebar from "./sidebar";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useMemo, useState } from "react";

const MainLayout = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [locationKey, setLocationKey] = useState<string>("admin/dashboard");
  useMemo(() => {
    setLocationKey(location.pathname.slice(1, 100));
  }, [location.pathname]);
  return (
    <Layout className="h-screen">
      <Sidebar locationKey={locationKey} />
      <Layout style={{ marginLeft: 265 }}>
        <Header
          style={{ padding: 0, height: 50, background: "white" }}
          className="flex justify-end"
        >
          <Button
            type="text"
            icon={<AiOutlineLogout />}
            style={{
              fontSize: "16px",
              width: 50,
              height: 50,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "5px 0",
            marginRight: "5px",
            padding: 20,
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
