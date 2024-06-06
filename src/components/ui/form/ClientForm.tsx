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
  fileList: any;
  setFileList: any;
};

const ClientForm = ({
  form,
  record,
  onFinish,
  loading,
  fileList,
  setFileList,
}: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
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
        activity: record?.activity,
        package_name: record?.package_name,
        plan: record?.plan,
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
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && "+ Upload"}
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
              <Form.Item
                className="w-full m-0"
                name="date_of_birth"
                label="Date of Birth"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-full" format={"DD/MM/YYYY"} />
              </Form.Item>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium text-base">Membership Details</p>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                name="activity"
                label="Activity"
                className="w-full m-0"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Activity"
                  options={[
                    {
                      label: "Active",
                      value: true,
                    },
                    {
                      label: "In Active",
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="package_name"
                label="Membership"
                className="w-full m-0"
                rules={[{ required: true, message: "Please select Package" }]}
              >
                <Select
                  placeholder="Select package"
                  options={[
                    {
                      label: "No Membeship",
                      value: "no membeship",
                    },
                    { label: "Individual pro", value: "individual pro" },
                    {
                      label: "Individual pro unlimited",
                      value: "individual pro unlimited",
                    },
                    {
                      label: "Teams & Organizations",
                      value: "teams & organizations",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="plan"
                label="Plan"
                className="w-full m-0"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Plan"
                  options={[
                    {
                      label: "No Plan",
                      value: "no plan",
                    },
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
        {!record && (
          <div className="flex gap-2">
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
