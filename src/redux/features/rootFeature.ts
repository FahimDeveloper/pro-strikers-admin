import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import {
  adminApiSlice,
  appointmentGroupReservationApiSlice,
  appointmentOneOnOneReservationApiSlice,
  appointmentScheduleApiSlice,
  authApiSlice,
  classReservationApiSlice,
  classScheduleApiSlice,
  courseReservationApiSlice,
  courseScheduleApiSlice,
  eventApiSlice,
  eventGroupReservationApiSlice,
  eventIndividualReservationApiSlice,
  facilityReservationApiSlice,
  facilityScheduleApiSlice,
  laneApiSlice,
  orderApiSlice,
  postApiSlice,
  storeApiSlice,
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
  [storeApiSlice.reducerPath]: storeApiSlice.reducer,
  [laneApiSlice.reducerPath]: laneApiSlice.reducer,
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [appointmentGroupReservationApiSlice.reducerPath]:
    appointmentGroupReservationApiSlice.reducer,
  [appointmentOneOnOneReservationApiSlice.reducerPath]:
    appointmentOneOnOneReservationApiSlice.reducer,
  [classReservationApiSlice.reducerPath]: classReservationApiSlice.reducer,
  [courseReservationApiSlice.reducerPath]: courseReservationApiSlice.reducer,
  [facilityReservationApiSlice.reducerPath]:
    facilityReservationApiSlice.reducer,
  [eventGroupReservationApiSlice.reducerPath]:
    eventGroupReservationApiSlice.reducer,
  [eventIndividualReservationApiSlice.reducerPath]:
    eventIndividualReservationApiSlice.reducer,
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
  storeApiSlice.middleware,
  laneApiSlice.middleware,
  orderApiSlice.middleware,
  userApiSlice.middleware,
  appointmentGroupReservationApiSlice.middleware,
  appointmentOneOnOneReservationApiSlice.middleware,
  classReservationApiSlice.middleware,
  courseReservationApiSlice.middleware,
  facilityReservationApiSlice.middleware,
  eventGroupReservationApiSlice.middleware,
  eventIndividualReservationApiSlice.middleware,
];
