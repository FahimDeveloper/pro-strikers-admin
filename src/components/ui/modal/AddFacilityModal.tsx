import { Modal } from "antd";
import { useState } from "react";
import FacilitySteps from "../step/FacilitySteps";

const AddFacilityModal = () => {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Create Facility
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Facility"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <FacilitySteps setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddFacilityModal;
