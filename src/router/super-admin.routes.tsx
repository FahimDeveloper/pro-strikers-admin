import Coaches from "../pages/Coaches/Coaches";
import Dashboard from "../pages/Dashboard/Dashboard";
import Events from "../pages/Events/Events";
import Post from "../pages/Post/Post";
import AppointmentReports from "../pages/Reports/AppointmentReports/AppointmentReports";
import ClassesReports from "../pages/Reports/ClassesReports/ClassesReports";
import CoursesReports from "../pages/Reports/CoursesReports/CoursesReports";
import FacilityReports from "../pages/Reports/FacilityReports/FacilityReports";
import AppointmentReservation from "../pages/Reservations/AppointmentReservation/AppointmentReservation";
import ClassesReservation from "../pages/Reservations/ClassesReservation/ClassesReservation";
import CoursesReservation from "../pages/Reservations/CoursesReservation/CoursesReservation";
import FacilityReservation from "../pages/Reservations/FacilityReservation/FacilityReservation";
import AppointmentScheduling from "../pages/Scheduling/AppointmentScheduling/AppointmentScheduling";
import ClassesScheduling from "../pages/Scheduling/ClassesScheduling/ClassesScheduling";
import CoursesScheduling from "../pages/Scheduling/CoursesScheduling/CoursesScheduling";
import FacilityScheduling from "../pages/Scheduling/FacilityScheduling/FacilityScheduling";
import TeamMembers from "../pages/TeamMembers/TeamMembers";
import Users from "../pages/Users/Users";
import Voucher from "../pages/Voucher/Voucher";

export const superAdminRoutes = [
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
    name: "Coaches",
    path: "Coaches",
    element: <Coaches />,
  },
  {
    name: "Store",
    path: "store",
    element: <Coaches />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <Coaches />,
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
    ],
  },
  {
    name: "Post",
    path: "post",
    element: <Post />,
  },
];
