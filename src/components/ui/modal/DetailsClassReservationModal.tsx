import { useState } from "react";
import { IClassReservation } from "../../../types/class.types";
import { Button, Modal } from "antd";

const DetailsClassReservationModal = ({
  record,
}: {
  record: IClassReservation;
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
        title="Class Reservation Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      ></Modal>
    </>
  );
};

export default DetailsClassReservationModal;
