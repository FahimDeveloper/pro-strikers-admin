import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { IBrand } from "../../../types/brand.types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: IBrand;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const BrandForm = ({ form, loading, onFinish, record }: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        brand_name: record?.brand_name,
        category: record?.category,
        description: record?.description,
        brand_logo: [
          {
            uid: "-1",
            name: record?.brand_logo,
            status: "done",
            url: record?.brand_logo,
          },
        ],
      });
    }
  }, [record, form]);

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
  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        className="space-y-3"
      >
        <div className="flex justify-center">
          <Form.Item
            name="brand_logo"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Please select addon image",
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              className="justify-center"
              onPreview={handlePreview}
              maxCount={1}
              beforeUpload={() => false}
            >
              {"+ Upload"}
            </Upload>
          </Form.Item>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            label="Brand Name"
            name="brand_name"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Please input brand name!",
              },
            ]}
          >
            <Input placeholder="Enter your brand name" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            className="m-0"
            rules={[
              {
                required: true,
                message: "Please select category!",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Select product category"
              options={[
                { value: "bats", label: "Bats" },
                { value: "gloves", label: "Gloves" },
                { value: "wearables", label: "Wearables" },
                { value: "soccer item", label: "Soccer Item" },
                { value: "helmet", label: "Helmet" },
                { value: "sports bags", label: "Sports Bags" },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Description"
          name="description"
          className="m-0"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter your brand description" rows={4} />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item>
            <Button className="primary-btn" htmlType="submit" loading={loading}>
              {record && Object.keys(record).length > 0
                ? "Update Brand"
                : "Create Brand"}
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

export default BrandForm;
