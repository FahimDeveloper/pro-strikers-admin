/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddonForm from "../form/AddonForm";
import { useCreateAddonMutation } from "../../../redux/features/addon/addonApi";

const AddAddonModal = () => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [create, { data, isLoading, isSuccess, isError, error }] =
    useCreateAddonMutation();
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "#0ABAC3",
      });
      setModalOpen(false);
      form.resetFields();
    }
    if (isError) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `${(error as any)?.data?.message || "something went wrong"}`,
        confirmButtonColor: "#0ABAC3",
      });
    }
  }, [data, isSuccess, isError, form, error]);

  const onCancle = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values: any) => {
    const formData = new FormData();
    values.addons = values.addons.map((addon: any) => {
      formData.append("image", addon.addon_image[0].originFileObj);
      return {
        addon_title: addon.addon_title,
        addon_price: addon.addon_price,
        addon_description: addon.addon_description,
      };
    });
    formData.append("data", JSON.stringify(values));
    create(formData);
  };
  return (
    <>
      <button onClick={() => setModalOpen(true)} className="btn primary-btn">
        Add Addon
      </button>
      <Modal
        width={800}
        footer={null}
        title="Create New Addon"
        centered
        open={open}
        onCancel={onCancle}
        maskClosable={false}
      >
        <AddonForm form={form} onFinish={onFinish} loading={isLoading} />
      </Modal>
    </>
  );
};

export default AddAddonModal;
