/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import LazyLoad from "../components/common/LozyLoad";
const MembershipCancellation = LazyLoad(
  lazy(() => import("../pages/MembershipCancellation/MembershipCancellation"))
);
const Profile = LazyLoad(lazy(() => import("../pages/Profile/Profile")));
// const Brands = LazyLoad(
//   lazy(() => import("../pages/StoreManage/Brands/Brands"))
// );
// const Stores = LazyLoad(
//   lazy(() => import("../pages/StoreManage/Stores/Stores"))
// );
const Payment = LazyLoad(lazy(() => import("../pages/Payment/Payment")));
const AddonManage = LazyLoad(
  lazy(() => import("../pages/AddonManage/AddonManage"))
);

const EventsIndividutalReservation = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Reservations/EventsIndividualReservation/EventsIndividutalReservation"
      )
  )
);
const EventsGroupReservation = LazyLoad(
  lazy(
    () =>
      import(
        "../pages/Reservations/EventsGroupReservation/EventsGroupReservation"
      )
  )
);
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

// const Orders = LazyLoad(lazy(() => import("../pages/Orders/Orders")));
const Dashboard = LazyLoad(lazy(() => import("../pages/Dashboard/Dashboard")));
const Events = LazyLoad(lazy(() => import("../pages/Events/Events")));
const Post = LazyLoad(lazy(() => import("../pages/Post/Post")));
const AreaManage = LazyLoad(
  lazy(() => import("../pages/AreaManage/AreaManage"))
);
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
const Clients = LazyLoad(lazy(() => import("../pages/Clients/Clients")));
const Voucher = LazyLoad(lazy(() => import("../pages/Voucher/Voucher")));
const Membership = LazyLoad(
  lazy(() => import("../pages/Membership/Membership"))
);

export const adminPaths = [
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
      {
        name: "Events",
        children: [
          {
            name: "Individual",
            path: "reservation/events/individual",
            element: <EventsIndividutalReservation />,
          },
          {
            name: "Group",
            path: "reservation/events/group",
            element: <EventsGroupReservation />,
          },
        ],
      },
    ],
  },
  {
    name: "Events",
    path: "events",
    element: <Events />,
  },
  {
    name: "Clients",
    path: "clients",
    element: <Clients />,
  },
  {
    name: "Membership Clients",
    path: "membership-clients",
    element: <Membership />,
  },
  {
    name: "Area Manage",
    path: "area-manage",
    element: <AreaManage />,
  },
  {
    name: "Addon Manage",
    path: "addon-manage",
    element: <AddonManage />,
  },
  {
    name: "Membership Cancellation",
    path: "membership-cancellation",
    element: <MembershipCancellation />,
  },
  // {
  //   name: "Shop Manage",
  //   children: [
  //     {
  //       name: "Brands",
  //       path: "brands",
  //       element: <Brands />,
  //     },
  //     {
  //       name: "Stores",
  //       path: "stores",
  //       element: <Stores />,
  //     },
  //   ],
  // },
  // {
  //   name: "Orders",
  //   path: "orders",
  //   element: <Orders />,
  // },
  {
    name: "Voucher",
    path: "voucher",
    element: <Voucher />,
  },
  {
    name: "Payments",
    path: "payments",
    element: <Payment />,
  },
  {
    name: "Post",
    path: "post",
    element: <Post />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
