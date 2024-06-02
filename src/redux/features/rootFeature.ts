import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  adminApiSlice,
  appointmentScheduleApiSlice,
  authApiSlice,
  classScheduleApiSlice,
  courseScheduleApiSlice,
  eventApiSlice,
  facilityScheduleApiSlice,
  postApiSlice,
  userApiSlice,
  voucherApiSlice,
} from "../api/httpsSlice";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const rootReducers = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  [classScheduleApiSlice.reducerPath]: classScheduleApiSlice.reducer,
  [courseScheduleApiSlice.reducerPath]: courseScheduleApiSlice.reducer,
  [facilityScheduleApiSlice.reducerPath]: facilityScheduleApiSlice.reducer,
  [appointmentScheduleApiSlice.reducerPath]:
    appointmentScheduleApiSlice.reducer,
  [eventApiSlice.reducerPath]: eventApiSlice.reducer,
  [postApiSlice.reducerPath]: postApiSlice.reducer,
  [voucherApiSlice.reducerPath]: voucherApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  auth: persistedAuthReducer,
});

export const rootMiddlewares = [
  authApiSlice.middleware,
  adminApiSlice.middleware,
  classScheduleApiSlice.middleware,
  courseScheduleApiSlice.middleware,
  facilityScheduleApiSlice.middleware,
  appointmentScheduleApiSlice.middleware,
  eventApiSlice.middleware,
  postApiSlice.middleware,
  voucherApiSlice.middleware,
  userApiSlice.middleware,
];
