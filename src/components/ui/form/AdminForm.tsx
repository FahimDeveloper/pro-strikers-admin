/* eslint-disable @typescript-eslint/no-explicit-any */
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

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
  fileList: any;
  setFileList: any;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AdminForm = ({
  record,
  onFinish,
  loading,
  form,
  fileList,
  setFileList,
}: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
    if (record?.image) {
      setFileList([
        {
          uid: "-1",
          name: record?.image,
          status: "done",
          url: record?.image,
        },
      ]);
    }
  }, [record, form, setFileList]);

  return (
    <div>
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
            rules={[{ required: true, message: "Please select user image" }]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              style={{ justifyContent: "center" }}
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
          <p className="text-[#3A394B] text-sm">Upload Member Image</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-5">
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
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your phone" />
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
                ]}
              />
            </Form.Item>
            <Form.Item
              className="w-full m-0"
              name="date_of_birth"
              label="Date of Birth"
              rules={[{ required: true }]}
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
          {!record && (
            <div className="flex col-span-3 gap-2">
              <Form.Item
                className="m-0 w-full"
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item
                className="m-0 w-full"
                name="confirm_password"
                label="Confirm Password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
            </div>
          )}
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
    </div>
  );
};

export default AdminForm;
