import { Modal } from "antd";
import { useState } from "react";
import ClassSteps from "../step/ClassSteps";

const AddClassesModal = () => {
  const [open, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Facility
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Class"
        centered
        open={open}
        onCancel={() => setModalOpen(false)}
      >
        <ClassSteps setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default AddClassesModal;
