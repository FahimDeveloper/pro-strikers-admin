import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0ABAC3",
          borderRadius: 5,
        },
        components: {
          Menu: {
            itemHoverBg: "#0ABAC3",
            itemHoverColor: "#ffffff",
          },
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  );
};

export default App;
