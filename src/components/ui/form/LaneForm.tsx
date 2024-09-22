/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Switch,
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
  addon: boolean;
  setAddon: any;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const LaneForm = ({
  form,
  loading,
  onFinish,
  record,
  addon,
  setAddon,
}: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        lane_title: record?.lane_title,
        description: record?.description,
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
        addon: record?.addon ? record?.addon : false,
      });
    }
    if (record?.addon) {
      setAddon(true);
    } else {
      setAddon(false);
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
        <Form.Item
          label="Lane Name"
          className=" m-0"
          name="lane_title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter lane title" />
        </Form.Item>
        <Form.Item
          label="Description"
          className=" m-0"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="Enter lane description" />
        </Form.Item>
        <Form.Item
          rules={[{ required: false }]}
          name="addon"
          className="m-0"
          label="Addon"
          valuePropName="checked"
        >
          <Switch onChange={(value) => setAddon(value)} />
        </Form.Item>
        <Form.List name="addons">
          {(fields, { add: addOne, remove: removeOne }) => (
            <>
              <Form.Item className="m-0">
                <Button
                  type="primary"
                  disabled={addon ? false : true}
                  onClick={() => addOne()}
                >
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
                        disabled={addon ? false : true}
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
                          required: addon,
                          message: "Missing addon name",
                        },
                      ]}
                    >
                      <Input
                        disabled={addon ? false : true}
                        placeholder="Enter your addon"
                      />
                    </Form.Item>
                    <Form.Item
                      className="m-0"
                      label="Addon Price / 1hr"
                      {...restField}
                      name={[name, "addon_price"]}
                      rules={[
                        {
                          required: addon,
                          message: "Missing addon price",
                        },
                      ]}
                    >
                      <InputNumber
                        disabled={addon ? false : true}
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
                        required: addon,
                        message: "Missing addon description",
                      },
                    ]}
                  >
                    <Input.TextArea
                      disabled={addon ? false : true}
                      placeholder="Enter addon description"
                      rows={3}
                    />
                  </Form.Item>
                  <div className="flex justify-end">
                    <BiMinusCircle
                      className="size-5 cursor-pointer"
                      onClick={() => removeOne(name)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>
        <div className="flex justify-end">
          <Form.Item>
            <Button className="primary-btn" htmlType="submit" loading={loading}>
              {record && Object.keys(record).length > 0
                ? "Update Lane"
                : "Create Lane"}
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

export default LaneForm;
