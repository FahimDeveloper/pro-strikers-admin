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
  InputNumber,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IEvent } from "../../../types/event.types";

type TProp = {
  record?: IEvent;
  onFinish: any;
  form: any;
  loading: boolean;
  fileList: any;
  setFileList: any;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const EventForm = ({
  record,
  form,
  onFinish,
  loading,
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
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        event_name: record?.event_name,
        event_type: record?.event_type,
        sport: record?.sport,
        image: record?.image && [
          {
            uid: "-1",
            name: record?.image,
            status: "done",
            url: record?.image,
          },
        ],
        start_date:
          record?.start_date && dayjs(record?.start_date, "DD/MM/YYYY"),
        end_date: record?.end_date && dayjs(record?.end_date, "DD/MM/YYYY"),
        location: record?.location,
        registration_start:
          record?.registration_start &&
          dayjs(record?.registration_start, "DD/MM/YYYY"),
        registration_end:
          record?.registration_end &&
          dayjs(record?.registration_end, "DD/MM/YYYY"),
        allowed_registrations: record?.allowed_registrations,
        description: record?.description,
        price: record?.price,
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
        className="space-y-5 mt-5"
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
          <p className="text-[#3A394B] text-sm">Upload Event Thumbnail</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="event_name"
            className="m-0"
            label="Event Name"
            rules={[{ required: true }]}
          >
            <Input className="w-full" placeholder="Enter event name" />
          </Form.Item>
          <Form.Item
            name="event_type"
            className="m-0"
            label="Event Type"
            rules={[{ required: true, message: "Please select event type" }]}
          >
            <Select
              placeholder="Select type"
              options={[
                {
                  label: "League",
                  value: "league",
                },
                {
                  label: "Tournament",
                  value: "tournament",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="sport"
            className="w-full m-0"
            label="Event Sport"
            rules={[{ required: true, message: "Please select Sport" }]}
          >
            <Select
              placeholder="Select sport"
              options={[
                {
                  label: "Cricket",
                  value: "cricket",
                },
                {
                  label: "Soccer",
                  value: "soccer",
                },
                {
                  label: "Baseball",
                  value: "baseball",
                },
                {
                  label: "Softball",
                  value: "softball",
                },
                {
                  label: "Hockey",
                  value: "hockey",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="start_date"
            className="m-0"
            label="Start Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="end_date"
            className="m-0"
            label="End Date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="location"
            className="m-0"
            label="Location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item
            name="registration_start"
            className="m-0"
            label="Registration Open"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="registration_end"
            className="m-0"
            label="Registration Close"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            name="allowed_registrations"
            className="m-0"
            label="Total Registrations Allowed"
            rules={[{ required: true, message: "Enter allowed registration" }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter allowed registration"
            />
          </Form.Item>
          <Form.Item
            name="description"
            className="w-full m-0 col-span-3"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter description" rows={5} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="price"
            className="m-0"
            label="Event Fee"
          >
            <InputNumber className="w-36" placeholder="Enter event fee" />
          </Form.Item>
        </div>
        <Form.Item className="flex justify-end m-0">
          <Button htmlType="submit" loading={loading} className="primary-btn">
            {record && Object.keys(record).length > 0
              ? "Update Event"
              : "Create Event"}
          </Button>
        </Form.Item>
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

export default EventForm;
