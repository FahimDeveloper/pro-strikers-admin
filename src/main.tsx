import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Fragment>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0ABAC3",
            borderRadius: 5,
            fontFamily: "Manrope",
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
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </Fragment>
);
