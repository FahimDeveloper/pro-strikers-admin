/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../../utils/textEditorModule";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
  fileList: any;
  setFileList: any;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const colorOptions: SelectProps["options"] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "orange", label: "Orange" },
  { value: "purple", label: "Purple" },
  { value: "brown", label: "Brown" },
  { value: "pink", label: "Pink" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "gray", label: "Gray" },
  { value: "cyan", label: "Cyan" },
  { value: "magenta", label: "Magenta" },
  { value: "lime", label: "Lime" },
  { value: "teal", label: "Teal" },
  { value: "maroon", label: "Maroon" },
  { value: "navy", label: "Navy" },
  { value: "olive", label: "Olive" },
  { value: "lavender", label: "Lavender" },
  { value: "turquoise", label: "Turquoise" },
  { value: "salmon", label: "Salmon" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "beige", label: "Beige" },
  { value: "ivory", label: "Ivory" },
  { value: "coral", label: "Coral" },
  { value: "crimson", label: "Crimson" },
  { value: "khaki", label: "Khaki" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "indigo", label: "Indigo" },
  { value: "aqua", label: "Aqua" },
  { value: "mint", label: "Mint" },
  { value: "peach", label: "Peach" },
  { value: "rose", label: "Rose" },
  { value: "amber", label: "Amber" },
  { value: "chartreuse", label: "Chartreuse" },
];

const sizeOptions: SelectProps["options"] = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "x-large", label: "Extra Large" },
];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductForm = ({ form, loading, onFinish, record }: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

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

  const [content, setContent] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        product_name: record?.product_name,
        price: record?.price,
        category: record?.category,
        description: record?.description,
        color: record?.color,
        size: record?.size,
        non_price_variation: record?.non_price_variation,
        price_variation: record?.price_variation,
        images:
          record?.images &&
          record?.images.map((image: string, index: number) => {
            return {
              uid: `${index}`,
              name: image,
              status: "done",
              url: image,
            };
          }),
        price_variations: record?.price_variations,
        non_price_variations: record?.non_price_variations,
      });
    }
  }, [record, form]);
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label="Thumbnail"
          name="thumbnail"
          className="m-0"
          rules={[{ required: true, message: "Please select user image" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            style={{ justifyContent: "center" }}
            maxCount={1}
            onPreview={handlePreview}
            beforeUpload={() => false}
          >
            {"+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Gallery (Up to 5 images)"
          name="gallery"
          className="m-0"
          rules={[{ required: true, message: "Please select user image" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            listType="picture-card"
            style={{ justifyContent: "center" }}
            maxCount={5}
            onPreview={handlePreview}
            beforeUpload={() => false}
          >
            {"+ Upload"}
          </Upload>
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            className="m-0"
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
          <Form.Item
            className="m-0"
            name="category"
            label="Category"
            rules={[{ required: true }]}
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
          <Form.Item
            className="m-0"
            name="brand"
            label="Brand"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select product brand"
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
          <Form.Item
            rules={[{ required: true }]}
            name="price"
            className=" m-0"
            label="Product Price"
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter product price"
            />
          </Form.Item>
        </div>
        <Form.List name="variations">
          {(fields, { add: addOne, remove: removeOne }) => (
            <>
              <Form.Item className="m-0">
                <Button type="primary" onClick={() => addOne()}>
                  Add Variation
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-4 gap-4">
                  <Form.Item
                    className="m-0"
                    label="Color"
                    {...restField}
                    name={[name, "color"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing color",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select color"
                      showSearch
                      options={colorOptions}
                    />
                  </Form.Item>
                  <Form.Item
                    className="m-0"
                    {...restField}
                    label="Size"
                    name={[name, "size"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing size",
                      },
                    ]}
                  >
                    <Select placeholder="Select size" options={sizeOptions} />
                  </Form.Item>
                  <Form.Item
                    className="m-0"
                    {...restField}
                    label="Stock"
                    name={[name, "stock"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing variation stock",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      className="w-full"
                      placeholder="Enter stock number"
                    />
                  </Form.Item>
                  <div className="flex gap-2 items-end">
                    <Form.Item
                      className="m-0"
                      {...restField}
                      label="Price"
                      name={[name, "price"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing variation price",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full"
                        min={0}
                        placeholder="Enter variation price"
                      />
                    </Form.Item>
                    <BiMinusCircle
                      className="size-5 mb-2 cursor-pointer"
                      onClick={() => removeOne(name)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item
          className="m-0 col-span-2"
          name="description"
          label="Product Details"
          rules={[{ required: true }]}
        >
          <ReactQuill
            theme="snow"
            className="h-56 pb-12"
            value={content}
            onChange={setContent}
            modules={modules}
          />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item className="m-0">
            <Button loading={loading} className="primary-btn" htmlType="submit">
              {record && Object.keys(record).length > 0
                ? "Update Product"
                : "Create Product"}
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

export default ProductForm;
