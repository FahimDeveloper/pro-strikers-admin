import { useState } from "react";
import { ICourseReservation } from "../../../types/couse.types";
import { Button, Modal } from "antd";

const DetailsCourseReservationModal = ({
  record,
}: {
  record: ICourseReservation;
}) => {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Details
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Course Reservation Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      ></Modal>
    </>
  );
};

export default DetailsCourseReservationModal;
