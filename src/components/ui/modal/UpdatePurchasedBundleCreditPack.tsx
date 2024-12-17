/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  IBundleCreditPackRequest,
  IBundleCreditPackResponse,
} from "../../../types/bundle-package.type";
import { useForm } from "antd/es/form/Form";
import { useUpdatePurchasedBundlePackMutation } from "../../../redux/features/purchasedBundlePackage/purchasedBundlePackageApi";
import { Button, Modal } from "antd";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import BundleCreditPackForm from "../form/BundleCreditPackForm";
import { californiaTime } from "../../../utils/timeZone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const UpdatePurchasedBundleCreditPack = ({
  record,
}: {
  record: IBundleCreditPackResponse;
}) => {
  const [open, setModalOpen] = useState(false);
  const [form] = useForm();
  const [update, { data, isLoading, isSuccess, isError, error }] =
    useUpdatePurchasedBundlePackMutation();
  const onFinish = (values: IBundleCreditPackRequest) => {
    values.attendance = values?.attendance?.map((value) => {
      return {
        ...value,
        times: value?.times?.map((time) => {
          return {
            ...time,
            start_time: californiaTime(
              (time?.start_time as any)?.toISOString()
            ),
            end_time: californiaTime((time?.end_time as any)?.toISOString()),
          };
        }),
      };
    });
    update({ id: record?._id, body: values });
  };
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
    form.resetFields();
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
        width={1000}
        footer={null}
        title="Update credit pack details"
        centered
        open={open}
        onCancel={onCancel}
        maskClosable={false}
      >
        <div className="my-5">
          <BundleCreditPackForm
            record={record}
            form={form}
            onFinish={onFinish}
            loading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdatePurchasedBundleCreditPack;
