import { useState } from "react";
import { IAppointmentGroupReservation } from "../../../types/appointment.types";
import { Button, Descriptions, Divider, Modal } from "antd";
import moment from "moment";
import { collectTimeFromSchedule } from "../../../utils/collectTimeFromSchedule";
import { collectTimeDuration } from "../../../utils/collectTimeDuration";

const DetailsGroupAppointmentReservationModal = ({
  record,
}: {
  record: IAppointmentGroupReservation;
}) => {
  const [open, setModalOpen] = useState(false);
  const day = record.appointment.schedules.find(
    (s) => s.day === collectTimeFromSchedule(record.appointment_date)
  );
  const duration = collectTimeDuration(day?.start_time, day?.end_time);
  const start_time = moment(day?.start_time).format("hh:mm A");
  const end_time = moment(day?.end_time).format("hh:mm A");
  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Details
      </Button>
      <Modal
        width={800}
        footer={null}
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      >
        <Descriptions title="Client Info" bordered column={2}>
          <Descriptions.Item label="First Name">
            {record.first_name}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {record.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{record.phone}</Descriptions.Item>
          <Descriptions.Item label="Age">{record.age}</Descriptions.Item>
          <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Appointment Info" bordered column={2}>
          <Descriptions.Item label="Appointment Name">
            {record.appointment.appointment_name}
          </Descriptions.Item>
          <Descriptions.Item label="Sport">{record.sport}</Descriptions.Item>
          <Descriptions.Item label="Trainer">
            {record?.trainer?.first_name} {record?.trainer?.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">{duration}</Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {record.appointment.description}
          </Descriptions.Item>
          <Descriptions.Item label="Appointment Date" span={2}>
            {moment(record.appointment_date).format("dddd, MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Start Time">{start_time}</Descriptions.Item>
          <Descriptions.Item label="End Time">{end_time}</Descriptions.Item>
          <Descriptions.Item label="Price">
            ${record.appointment.price}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Address" bordered column={2}>
          <Descriptions.Item label="Street Address">
            {record.street_address}
          </Descriptions.Item>
          <Descriptions.Item label="City">{record.city}</Descriptions.Item>
          <Descriptions.Item label="State">{record.state}</Descriptions.Item>
          <Descriptions.Item label="Zip Code">
            {record.zip_code}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default DetailsGroupAppointmentReservationModal;
