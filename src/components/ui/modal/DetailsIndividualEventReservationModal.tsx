import { useState } from "react";
import { IEventIndividualReservation } from "../../../types/event.types";
import { Button, Descriptions, Divider, Modal } from "antd";
import { collectDateStatus } from "../../../utils/collectDateStatus";
import moment from "moment";

const DetailsIndividualEventReservationModal = ({
  record,
}: {
  record: IEventIndividualReservation;
}) => {
  const [open, setModalOpen] = useState(false);
  const status = collectDateStatus(
    record.event.end_date,
    record.event.start_date
  );
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
      </Modal>
    </>
  );
};

export default DetailsIndividualEventReservationModal;
