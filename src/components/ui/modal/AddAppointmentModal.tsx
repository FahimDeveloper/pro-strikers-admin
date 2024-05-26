import { Modal } from "antd";
import { useState } from "react";
import AppointmentSteps from "../step/AppointmentSteps";

const AddAppointmentModal = () => {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Create Appointment
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Appointment"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <AppointmentSteps setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddAppointmentModal;
