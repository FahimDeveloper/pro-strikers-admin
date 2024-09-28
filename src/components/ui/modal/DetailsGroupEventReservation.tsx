import { useState } from "react";
import { IEventGroupReservation } from "../../../types/event.types";
import { Button, Modal } from "antd";

const DetailsGroupEventReservation = ({
  record,
}: {
  record: IEventGroupReservation;
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
        title="Group Event Reservation Details"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
      ></Modal>
    </>
  );
};

export default DetailsGroupEventReservation;
