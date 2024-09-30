import { useState } from "react";
import { ICourseReservation } from "../../../types/couse.types";
import { Button, Descriptions, Divider, Modal } from "antd";
import moment from "moment";
import { collectTimeDuration } from "../../../utils/collectTimeDuration";
import { collectDateStatus } from "../../../utils/collectDateStatus";

const DetailsCourseReservationModal = ({
  record,
}: {
  record: ICourseReservation;
}) => {
  const [open, setModalOpen] = useState(false);
  const status = collectDateStatus(
    record.course.end_date,
    record.course.start_date
  );
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

        <Descriptions title="Bootcamp Info" bordered column={2}>
          <Descriptions.Item label="Bootcamp Name">
            {record.course.course_name}
          </Descriptions.Item>
          <Descriptions.Item label="Sport">{record.sport}</Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {record.course.description}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date" span={2}>
            {moment(record.course.start_date).format("dddd, MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={2}>
            {moment(record.course.end_date).format("dddd, MMMM Do YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
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
          <Descriptions.Item label="Start Time">
            {moment(record.course.start_time).format("h:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="End Time">
            {moment(record.course.end_time).format("h:mm A")}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {collectTimeDuration(
              record.course?.start_time,
              record.course?.end_time
            )}{" "}
            per day
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${record.course.price}
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

export default DetailsCourseReservationModal;
