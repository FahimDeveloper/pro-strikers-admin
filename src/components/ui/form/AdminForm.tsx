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

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AdminForm = ({ record, onFinish, loading, form }: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

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

  useEffect(() => {
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    if (record) {
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
        description: record?.description,
        date_of_birth: record?.date_of_birth
          ? dayjs(record?.date_of_birth, "DD/MM/YYYY")
          : "",
        role: record?.role,
      });
    }
  }, [record, form]);

  const validateUSPhoneNumber = (_: any, value: string) => {
    const phoneNumberRegex =
      /^(?:\+1\s*?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const hasCountryCode = /^\+1/.test(value);
    if (!hasCountryCode) {
      return Promise.reject(
        new Error("Please Enter number with the country code (+1)")
      );
    }
    if (value && !phoneNumberRegex.test(value)) {
      return Promise.reject(
        new Error("Please enter a valid USA phone number.")
      );
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-8"
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
              style={{ justifyContent: "center" }}
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
            >
              {"+ Upload"}
            </Upload>
          </Form.Item>
          <p className="text-[#3A394B] text-sm">Upload Member Image</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-5">
            <Form.Item
              name="first_name"
              label="Member First Name"
              className="w-full m-0"
              rules={[{ required: true, message: "Please enter First Name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Member Last Name"
              className="w-full m-0"
              rules={[{ required: true, message: "Please enter Last Name" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-5">
            <Form.Item
              className="w-full m-0"
              name="email"
              label="Email"
              rules={[{ required: true }]}
            >
              <Input
                readOnly={record?.email ? true : false}
                placeholder="Enter your email"
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
              <Input prefix={"USA"} placeholder="Enter your phone number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-x-5">
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
              name="role"
              label="Role"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Super Admin", value: "super-admin" },
                  { label: "Trainer", value: "trainer" },
                  { label: "Manager", value: "manager" },
                  { label: "Staff", value: "staff" },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="w-full m-0"
              name="date_of_birth"
              label="Date of Birth"
            >
              <DatePicker format={"DD/MM/YYYY"} className="w-full" />
            </Form.Item>
          </div>
          <Form.Item
            className="w-full m-0 col-span-2"
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Form.Item className="m-0">
            <Button htmlType="submit" loading={loading} className="primary-btn">
              {record && Object.keys(record).length > 0
                ? "Update Member"
                : "Create Member"}
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

export default AdminForm;
