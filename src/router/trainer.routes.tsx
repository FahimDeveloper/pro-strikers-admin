/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import LazyLoad from "../components/common/LozyLoad";

const AppointmentOneOnOneScheduling = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Scheduling/AppointmentOneOnOneScheduling/AppointmentOneOnOneScheduling"
      )
  )
);
const AppointmentGroupScheduling = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Scheduling/AppointmentGroupScheduling/AppointmentGroupScheduling"
      )
  )
);
const Dashboard = LazyLoad(lazy(() => import("../pages/Dashboard/Dashboard")));
const AppointmentOneOnOneReservation = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Reservations/AppointmentOneOnOneReservation/AppointmentOneOnOneReservation"
      )
  )
);
const AppointmentGroupReservation = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Reservations/AppointmentGroupReservation/AppointmentGroupReservation"
      )
  )
);
const ClassesReservation = LazyLoad(
  lazy(
    () => import("../pages/Reservations/ClassesReservation/ClassesReservation")
  )
);
const CoursesReservation = LazyLoad(
  lazy(
    () => import("../pages/Reservations/CoursesReservation/CoursesReservation")
  )
);
const FacilityReservation = LazyLoad(
  lazy(
    () =>
      import("../pages/Reservations/FacilityReservation/FacilityReservation")
  )
);
const ClassesScheduling = LazyLoad(
  lazy(() => import("../pages/Scheduling/ClassesScheduling/ClassesScheduling"))
);
const CoursesScheduling = LazyLoad(
  lazy(() => import("../pages/Scheduling/CoursesScheduling/CoursesScheduling"))
);
const FacilityScheduling = LazyLoad(
  lazy(
    () => import("../pages/Scheduling/FacilityScheduling/FacilityScheduling")
  )
);

export const trainerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Scheduling",
    children: [
      {
        name: "Classes",
        path: "scheduling/classes",
        element: <ClassesScheduling />,
      },
      {
        name: "Appointment",
        children: [
          {
            name: "One On One",
            path: "scheduling/appointment/one-on-one",
            element: <AppointmentOneOnOneScheduling />,
          },
          {
            name: "Group",
            path: "scheduling/appointment/group",
            element: <AppointmentGroupScheduling />,
          },
        ],
      },
      {
        name: "Facility",
        path: "scheduling/facility",
        element: <FacilityScheduling />,
      },
      {
        name: "Courses",
        path: "scheduling/courses",
        element: <CoursesScheduling />,
      },
    ],
  },
  {
    name: "Reservation",
    children: [
      {
        name: "Classes",
        path: "reservation/classes",
        element: <ClassesReservation />,
      },
      {
        name: "Appointment",
        children: [
          {
            name: "One On One",
            path: "reservation/appointment/one-on-one",
            element: <AppointmentOneOnOneReservation />,
          },
          {
            name: "Group",
            path: "reservation/appointment/group",
            element: <AppointmentGroupReservation />,
          },
        ],
      },
      {
        name: "Facility",
        path: "reservation/facility",
        element: <FacilityReservation />,
      },
      {
        name: "Courses",
        path: "reservation/courses",
        element: <CoursesReservation />,
      },
    ],
  },
];
