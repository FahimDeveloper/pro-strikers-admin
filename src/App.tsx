import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0ABAC3",
          borderRadius: 2,
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
};

export default App;
