import { useState } from "react";
import { IEventIndividualReservation } from "../../../types/event.types";
import { Button, Modal } from "antd";

const DetailsIndividualEventReservationModal = ({
  record,
}: {
  record: IEventIndividualReservation;
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
        title="Individual Event Reservation Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      ></Modal>
    </>
  );
};

export default DetailsIndividualEventReservationModal;
