import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Fragment>
    <Provider store={store}>
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
              itemColor: "#4B4B4B",
              itemSelectedBg: "#0ABAC3",
              itemSelectedColor: "#ffffff",
              horizontalItemSelectedColor: "#0ABAC3",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </Fragment>
);
