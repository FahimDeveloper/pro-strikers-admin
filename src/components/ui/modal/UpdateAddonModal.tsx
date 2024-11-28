/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import AddonForm from "../form/AddonForm";
import { useUpdateAddonMutation } from "../../../redux/features/addon/addonApi";

const UpdateAddonModal = ({ record }: any) => {
  const [form] = Form.useForm();
  const [open, setModalOpen] = useState(false);
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAddonMutation();
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

  const onCancel = () => {
    setModalOpen(false);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    const oldAddons: any = [];
    const newAddons: any = [];
    const newImages: any = [];
    values.addons.forEach((addon: any) => {
      if (addon?.addon_image[0].originFileObj) {
        newImages.push(addon.addon_image[0].originFileObj);
        delete addon.addon_image;
        newAddons.push(addon);
      } else if (addon?.addon_image[0].url) {
        oldAddons.push({ ...addon, addon_image: addon.addon_image[0].url });
      }
    });
    if (newImages.length > 0) {
      delete values.addons;
      values.old_addons = [...oldAddons];
      values.new_addons = [...newAddons];
      newImages.forEach((image: any) => {
        formData.append("image", image);
      });
      formData.append("data", JSON.stringify(values));
      update({ id: record?._id, body: formData });
    } else {
      values.addons = [...oldAddons];
      update({ id: record?._id, body: values });
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        className="w-full flex gap-1 justify-center items-center"
      >
        <CiEdit className="size-5 text-white" /> Update
      </Button>
      <Modal
        width={800}
        footer={null}
        title="Update Addon"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <AddonForm
          record={record}
          form={form}
          onFinish={onFinish}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default UpdateAddonModal;
