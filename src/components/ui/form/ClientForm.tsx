/* eslint-disable @typescript-eslint/no-explicit-any */
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import {
  Button,
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};

const ClientForm = ({ form, record, onFinish, loading }: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [checkMembership, setCheckMembership] = useState(false);

  const beforeUpload = (file: FileType) => {
    if (file.size > 5242880) {
      Swal.fire({
        title: "Oops!..",
        icon: "error",
        text: `Image size too large, please use less than 5MB`,
        confirmButtonColor: "#0ABAC3",
      });
      return Upload.LIST_IGNORE; // Prevent the upload by returning LIST_IGNORE
    }
    return false;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const normFile = (e: { fileList: any }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    if (record) {
      if (record?.membership) {
        setCheckMembership(true);
      }
      form.setFieldsValue({
        first_name: record?.first_name,
        last_name: record?.last_name,
        email: record?.email,
        gender: record?.gender,
        phone: record?.phone,
        image: record?.image && [
          {
            uid: "-1",
            name: record?.image,
            status: "done",
            url: record?.image,
          },
        ],
        date_of_birth: record?.date_of_birth
          ? dayjs(record?.date_of_birth, "DD/MM/YYYY")
          : "",
        membership: record?.membership,
        package_name: record?.package_name,
        plan: record?.plan,
      });
    }
  }, [record, form]);

  const validateUSPhoneNumber = (_: any, value: string) => {
    const phoneNumberRegex =
      /^(?:\+1\s*?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (!phoneNumberRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid USA phone number"));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-5"
      >
        <div className="flex flex-col items-center justify-center">
          <Form.Item
            name="image"
            className="m-0 mb-2"
            rules={[{ required: false, message: "Please select user image" }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              className="justify-center"
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              {"+ Upload"}
            </Upload>
          </Form.Item>
          <p className="text-[#3A394B] text-sm">Upload Cleint Image</p>
        </div>
        <div className="space-y-5">
          <div className="space-y-4">
            <p className="font-medium text-base">Personal Details</p>
            <div className="grid grid-cols-3 gap-x-5 gap-y-3">
              <Form.Item
                name="first_name"
                label="Client First Name"
                className="w-full m-0"
                rules={[{ required: true, message: "Please enter First Name" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Client Last Name"
                className="w-full m-0"
                rules={[{ required: true, message: "Please enter Last Name" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                className="w-full m-0"
                rules={[{ required: true, message: "Please select Gender" }]}
              >
                <Select
                  placeholder="Select gender"
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                className="w-full m-0"
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input
                  readOnly={record?.email ? true : false}
                  placeholder="Enter client email"
                />
              </Form.Item>
              <Form.Item
                className="w-full m-0"
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "" },
                  { validator: validateUSPhoneNumber },
                ]}
              >
                <Input prefix={"USA"} placeholder="Enter client phone number" />
              </Form.Item>
              <Form.Item
                className="w-full m-0"
                name="date_of_birth"
                label="Date of Birth"
              >
                <DatePicker className="w-full" format={"DD/MM/YYYY"} />
              </Form.Item>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium text-base">Membership Details</p>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                name="membership"
                label="Membership"
                className="w-full m-0"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Membership"
                  onChange={(value) => setCheckMembership(value)}
                  options={[
                    {
                      label: "Yes",
                      value: true,
                    },
                    {
                      label: "No",
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="package_name"
                label="Package"
                className="w-full m-0"
                rules={[
                  {
                    required: checkMembership,
                    message: "Please select Package",
                  },
                ]}
              >
                <Select
                  disabled={!checkMembership}
                  placeholder="Select package"
                  options={[
                    { label: "Individual pro", value: "individual pro" },
                    {
                      label: "Individual pro unlimited",
                      value: "individual pro unlimited",
                    },
                    {
                      label: "Teams & Organizations",
                      value: "teams & organizations",
                    },
                    {
                      label: "Youth Training Membership",
                      value: "youth training membership",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="plan"
                label="Plan"
                className="w-full m-0"
                rules={[{ required: checkMembership }]}
              >
                <Select
                  disabled={!checkMembership}
                  placeholder="Select Plan"
                  options={[
                    {
                      label: "Monthly",
                      value: "monthly",
                    },
                    {
                      label: "Yearly",
                      value: "yearly",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Form.Item className="m-0">
            <Button htmlType="submit" loading={loading} className="primary-btn">
              {record && Object.keys(record).length > 0
                ? "Update Client"
                : "Create Client"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ClientForm;
