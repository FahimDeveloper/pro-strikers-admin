// import React, { useState } from "react";
// import {
//   Badge,
//   Calendar,
//   Modal,
//   type BadgeProps,
//   type CalendarProps,
// } from "antd";
// import dayjs, { Dayjs } from "dayjs";
// import weekday from "dayjs/plugin/weekday";
// import localeData from "dayjs/plugin/localeData";
// import { CalendarMode } from "antd/es/calendar/generateCalendar";

// dayjs.extend(weekday);
// dayjs.extend(localeData);

// const getListData = (value: Dayjs) => {
//   let listData: { type: string; content: string }[] = [];
//   switch (value.date()) {
//     case 8:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//       ];
//       break;
//     case 10:
//       listData = [
//         { type: "warning", content: "This is warning event." },
//         { type: "success", content: "This is usual event." },
//         { type: "error", content: "This is error event." },
//       ];
//       break;
//     case 15:
//       listData = [
//         { type: "warning", content: "This is warning event" },
//         { type: "success", content: "This is very long usual event......" },
//         { type: "error", content: "This is error event 1." },
//         { type: "error", content: "This is error event 2." },
//         { type: "error", content: "This is error event 3." },
//         { type: "error", content: "This is error event 4." },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };

// const TrainerReservations: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState<string>("");

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setModalContent("");
//   };

//   const monthCellRender = () => {
//     return null;
//   };

//   const handleOpen = () => {
//     setIsModalVisible(true);
//   };

//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value);
//     return (
//       <div onClick={() => handleOpen()}>
//         <ul className="events">
//           {listData.map((item) => (
//             <li key={item.content}>
//               <Badge
//                 className="truncate w-full"
//                 status={item.type as BadgeProps["status"]}
//                 text={item.content}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   const cellRender: CalendarProps<Dayjs>["cellRender"] = (date, info) => {
//     if (info.type === "date") return dateCellRender(date);
//     if (info.type === "month") return monthCellRender();
//     return info.originNode;
//   };

//   const handlePanelChange = (value: Dayjs, mode: CalendarMode) => {
//     console.log("Panel changed:");
//     console.log("Selected date:", value);
//     console.log("Current mode:", mode);
//   };

//   return (
//     <div>
//       <Calendar
//         mode="month"
//         cellRender={cellRender}
//         onPanelChange={handlePanelChange}
//       />
//       <Modal
//         title="Events for the Selected Day"
//         open={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         centered
//       >
//         <pre>{modalContent}</pre>
//       </Modal>
//     </div>
//   );
// };

// export default TrainerReservations;
