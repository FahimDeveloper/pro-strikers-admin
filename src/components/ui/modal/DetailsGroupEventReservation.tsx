import { useState } from "react";
import { IEventGroupReservation } from "../../../types/event.types";
import { Button, Descriptions, Divider, Modal } from "antd";
import moment from "moment";
import { collectDateStatus } from "../../../utils/collectDateStatus";
import Table, { ColumnsType } from "antd/es/table";

const DetailsGroupEventReservation = ({
  record,
}: {
  record: IEventGroupReservation;
}) => {
  const [open, setModalOpen] = useState(false);
  const status = collectDateStatus(
    record.event.end_date,
    record.event.start_date
  );
  const teamColumns: ColumnsType<{
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    contact: string;
  }> = [
    {
      width: 70,
      align: "center",
      title: "S/N",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, _record, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Player Name",
      dataIndex: "first_name",
      key: "last_name",
      render: (_, record) => (
        <p>
          {record.first_name} {record.last_name}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Details
      </Button>
      <Modal
        width={1000}
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

        <Descriptions title="Event Info" bordered column={2}>
          <Descriptions.Item className="w-auto" label="Event Name">
            {record.event.event_name}
          </Descriptions.Item>
          <Descriptions.Item label="Sport">{record.sport}</Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {record.event.description}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date" span={2}>
            {moment(record.event.start_date).format("dddd, MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={2}>
            {moment(record.event.end_date).format("dddd, MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <p className="font-medium text-sm leading-5 text-[#151515]">
              {status === "completed" && (
                <div className="px-2 py-1 w-24 text-center bg-[#D6FFC8] rounded-md text-[#0D2B03]">
                  Completed
                </div>
              )}
              {status === "running" && (
                <div className="px-2 py-1 w-24 text-center bg-yellow-200 text-yellow-800 rounded-md">
                  Running
                </div>
              )}
              {status === "upcoming" && (
                <div className="px-2 py-1 bg-[#FFF3C8] rounded-md text-[#6A5300]">
                  Upcoming
                </div>
              )}
            </p>
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${record.event.price}
          </Descriptions.Item>
        </Descriptions>
        <Table
          title={() => (
            <h3 className="text-base font-bold">{record.team_name}</h3>
          )}
          columns={teamColumns}
          dataSource={record.team}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default DetailsGroupEventReservation;
