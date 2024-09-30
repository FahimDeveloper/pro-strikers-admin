import { useState } from "react";
import { IAppointmentOneReservation } from "../../../types/appointment.types";
import { Button, Descriptions, Divider, Modal, Table } from "antd";
import { collectDateStatus } from "../../../utils/collectDateStatus";
import moment from "moment";

const DetailsOneOnOneAppointmentReservationModal = ({
  record,
}: {
  record: IAppointmentOneReservation;
}) => {
  const [open, setModalOpen] = useState(false);

  const bookingColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => moment(text).format("dddd, MMMM Do YYYY"),
    },
    {
      title: "Time Slot",
      dataIndex: "time_slot",
      key: "time_slot",
    },
    {
      title: "Status",
      dataIndex: "date",
      key: "date",
      render: (text: string) => {
        const status = collectDateStatus(text);
        return (
          <p className="font-medium text-sm leading-5 text-[#151515]">
            {status === "completed" && (
              <div className="py-1 bg-[#D6FFC8] rounded-md text-center text-[#0D2B03]">
                Completed
              </div>
            )}
            {status === "today" && (
              <div className="py-1 bg-yellow-200 text-yellow-800 rounded-md text-center">
                Today
              </div>
            )}
            {status === "upcoming" && (
              <div className="py-1 bg-[#FFF3C8] rounded-md text-center text-[#6A5300]">
                Upcoming
              </div>
            )}
          </p>
        );
      },
    },
  ];
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
            {record.trainer.first_name} {record.trainer.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {record.appointment.duration} mins
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {record.appointment.description}
          </Descriptions.Item>
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

        <Divider />

        <Table
          title={() => <h3 className="text-base font-bold">Bookings</h3>}
          columns={bookingColumns}
          dataSource={record.bookings}
          pagination={false}
          rowKey="date"
        />
      </Modal>
    </>
  );
};

export default DetailsOneOnOneAppointmentReservationModal;
