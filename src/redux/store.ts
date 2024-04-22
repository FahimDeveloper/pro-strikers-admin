import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
