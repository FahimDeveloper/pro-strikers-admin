/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
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
import { useEffect, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddonForm = ({ form, loading, onFinish, record }: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        sport: record?.sport,
        facility: record?.facility,
        addons:
          record?.addons &&
          record?.addons.map((addon: any) => ({
            ...addon,
            addon_image: [
              {
                uid: "-1",
                name: addon?.addon_image,
                status: "done",
                url: addon?.addon_image,
              },
            ],
          })),
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
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-5">
          <Form.Item
            className="m-0"
            name="facility"
            label="Faciltiy"
            rules={[{ required: true }]}
          >
            <Select
              className="w-full"
              optionFilterProp="children"
              placeholder="Select addon facility"
              options={[
                {
                  label: "Cricket Cage",
                  value: "cricket cage",
                },
                {
                  label: "Soccer Cage",
                  value: "soccer cage",
                },
                {
                  label: "Baseball Cage",
                  value: "baseball cage",
                },
                {
                  label: "Softball Cage",
                  value: "softball cage",
                },
                {
                  label: "Hockey Cage",
                  value: "hockey cage",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            className="m-0"
            name="sport"
            label="Sport"
            rules={[{ required: true }]}
          >
            <Select
              className="w-full"
              optionFilterProp="children"
              placeholder="Select addon sport"
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
        </div>
        <Form.List name="addons">
          {(fields, { add: addOne, remove: removeOne }) => (
            <>
              <Form.Item className="m-0">
                <Button type="primary" onClick={() => addOne()}>
                  Add Addon
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    <Form.Item
                      {...restField}
                      name={[name, "addon_image"]}
                      className="m-0 mb-2"
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
                    <p className="text-[#3A394B] text-sm">Upload Addon Image</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Form.Item
                      className="m-0 col-span-2"
                      {...restField}
                      label="Addon Name"
                      name={[name, "addon_title"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing addon name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your addon" />
                    </Form.Item>
                    <Form.Item
                      className="m-0"
                      label="Addon Price / 1hr"
                      {...restField}
                      name={[name, "addon_price"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing addon price",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        placeholder="Enter addon price"
                        min={0}
                      />
                    </Form.Item>
                  </div>
                  <Form.Item
                    className="m-0"
                    {...restField}
                    label="Addon Description"
                    name={[name, "addon_description"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing addon description",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Enter addon description"
                      rows={3}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <div className="flex justify-end">
                      <BiMinusCircle
                        className="size-5 cursor-pointer"
                        onClick={() => removeOne(name)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </Form.List>
        <div className="flex justify-end">
          <Form.Item>
            <Button className="primary-btn" htmlType="submit" loading={loading}>
              {record && Object.keys(record).length > 0
                ? "Update Addon"
                : "Create Addon"}
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

export default AddonForm;
