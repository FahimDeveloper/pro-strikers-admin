/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import LazyLoad from "../components/common/LozyLoad";

const Store = LazyLoad(lazy(() => import("../pages/Store/Store")));
const Orders = LazyLoad(lazy(() => import("../pages/Orders/Orders")));
const Dashboard = LazyLoad(lazy(() => import("../pages/Dashboard/Dashboard")));
const Events = LazyLoad(lazy(() => import("../pages/Events/Events")));
const Post = LazyLoad(lazy(() => import("../pages/Post/Post")));
const AppointmentReservation = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Reservations/AppointmentReservation/AppointmentReservation"
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
const AppointmentScheduling = LazyLoad(
  lazy(
    () =>
      import("../pages/Scheduling/AppointmentScheduling/AppointmentScheduling")
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
const TeamMembers = LazyLoad(
  lazy(() => import("../pages/TeamMembers/TeamMembers"))
);
const Users = LazyLoad(lazy(() => import("../pages/Users/Users")));
const Voucher = LazyLoad(lazy(() => import("../pages/Voucher/Voucher")));
const AppointmentReports = LazyLoad(
  lazy(() => import("../pages/Reports/AppointmentReports/AppointmentReports"))
);
const ClassesReports = LazyLoad(
  lazy(() => import("../pages/Reports/ClassesReports/ClassesReports"))
);
const CoursesReports = LazyLoad(
  lazy(() => import("../pages/Reports/CoursesReports/CoursesReports"))
);
const FacilityReports = LazyLoad(
  lazy(() => import("../pages/Reports/FacilityReports/FacilityReports"))
);
const Membership = LazyLoad(
  lazy(() => import("../pages/Membership/Membership"))
);
const MembershipReports = LazyLoad(
  lazy(() => import("../pages/Reports/MembershipReports/MembershipReports"))
);
const StoreReports = LazyLoad(
  lazy(() => import("../pages/Reports/StoreReports/StoreReports"))
);

export const superAdminPaths = [
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
        path: "scheduling/appointment",
        element: <AppointmentScheduling />,
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
        path: "reservation/appointment",
        element: <AppointmentReservation />,
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
  {
    name: "Users",
    path: "users",
    element: <Users />,
  },
  {
    name: "Team Members",
    path: "team-members",
    element: <TeamMembers />,
  },
  {
    name: "Membership",
    path: "membership",
    element: <Membership />,
  },
  {
    name: "Store",
    path: "store",
    element: <Store />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Orders />,
  },
  {
    name: "Voucher",
    path: "voucher",
    element: <Voucher />,
  },
  {
    name: "Events",
    path: "events",
    element: <Events />,
  },
  {
    name: "Reports",
    children: [
      {
        name: "Classes",
        path: "reports/classes",
        element: <ClassesReports />,
      },
      {
        name: "Appointment",
        path: "reports/appointment",
        element: <AppointmentReports />,
      },
      {
        name: "Facility",
        path: "reports/facility",
        element: <FacilityReports />,
      },
      {
        name: "Courses",
        path: "reports/courses",
        element: <CoursesReports />,
      },
      {
        name: "Memberships",
        path: "reports/memberships",
        element: <MembershipReports />,
      },
      {
        name: "Store",
        path: "reports/store",
        element: <StoreReports />,
      },
    ],
  },
  {
    name: "Post",
    path: "post",
    element: <Post />,
  },
];