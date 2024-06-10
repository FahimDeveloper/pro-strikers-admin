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
  Switch,
  Tag,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";

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
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra Large" },
];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type TagRender = SelectProps["tagRender"];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={
        value !== "s" && value !== "m" && value !== "l" && value !== "xl"
          ? value
          : "default"
      }
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const ProductForm = ({
  form,
  loading,
  onFinish,
  record,
  fileList,
  setFileList,
}: TProp) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [priceVariation, setPriceVariation] = useState(false);
  const [variation, setVariation] = useState(false);
  const [priceVariationType, setPriceVariationType] = useState("");
  const [variationType, setVariationType] = useState("");

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

  const editor = useRef(null);
  const [content, setContent] = useState<string | undefined>(undefined);
  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      height: 400,
    }),
    []
  );

  useEffect(() => {
    if (record?.non_price_variation) {
      setVariation(true);
    } else {
      setVariation(false);
    }
    if (record?.price_variation) {
      setPriceVariation(true);
    } else {
      setPriceVariation(false);
    }
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
          label="Product view"
          name="images"
          className="m-0"
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
            {fileList.length < 5 && "+ Upload"}
          </Upload>
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            className="m-0"
            name="product_name"
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
            name="color"
            label="Color"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Color"
              showSearch
              options={colorOptions}
            />
          </Form.Item>
          <Form.Item
            className="m-0"
            name="size"
            label="Size"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Size"
              showSearch
              options={sizeOptions}
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          name="price"
          className=" m-0"
          label="Product Price"
        >
          <InputNumber
            min={0}
            className="w-48"
            placeholder="Enter product price"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: false }]}
          name="price_variation"
          className=" m-0"
          label="Price Variation"
          valuePropName="checked"
        >
          <Switch
            checked={priceVariation}
            onChange={() => setPriceVariation(!priceVariation)}
          />
        </Form.Item>
        <Form.List name="price_variations">
          {(fields, { add: addOne, remove: removeOne }) => (
            <>
              <Form.Item className="m-0">
                <Button
                  type="primary"
                  disabled={!priceVariation}
                  onClick={() => addOne()}
                >
                  Add Variation
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <Form.Item
                    className="m-0"
                    {...restField}
                    label="Variation Type"
                    name={[name, "variation_type"]}
                    rules={[
                      {
                        required: priceVariation,
                        message: "Missing variation type",
                      },
                    ]}
                  >
                    <Select
                      disabled={!priceVariation}
                      placeholder="Select Variation Type"
                      onChange={(value) => setPriceVariationType(value)}
                      options={[
                        {
                          label: "Color",
                          value: "color",
                        },
                        {
                          label: "Size",
                          value: "size",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    className="m-0"
                    label="Variation Value"
                    {...restField}
                    name={[name, "variation_value"]}
                    rules={[
                      {
                        required: priceVariation,
                        message: "Missing variation value",
                      },
                    ]}
                  >
                    <Select
                      disabled={!priceVariation}
                      placeholder="Select Variation Value"
                      showSearch
                      options={
                        priceVariationType === "color"
                          ? colorOptions
                          : priceVariationType === "size"
                          ? sizeOptions
                          : []
                      }
                    />
                  </Form.Item>
                  <div className="flex items-end gap-2">
                    <Form.Item
                      className="m-0"
                      {...restField}
                      label="Variation Price"
                      name={[name, "variation_price"]}
                      rules={[
                        {
                          required: priceVariation,
                          message: "Missing variation price",
                        },
                      ]}
                    >
                      <InputNumber
                        disabled={!priceVariation}
                        className="w-full"
                        placeholder="Enter your variation price"
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
          rules={[{ required: false }]}
          name="non_price_variation"
          className=" m-0"
          label="Non Price Variation"
          valuePropName="checked"
        >
          <Switch
            checked={variation}
            onChange={() => setVariation(!variation)}
          />
        </Form.Item>
        <Form.List name="non_price_variations">
          {(fields, { add, remove }) => (
            <>
              <Form.Item className="m-0">
                <Button
                  type="primary"
                  disabled={!variation}
                  onClick={() => add()}
                >
                  Add Variation
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <Form.Item
                    className="m-0"
                    {...restField}
                    label="Variation Type"
                    name={[name, "variation_type"]}
                    rules={[
                      {
                        required: variation,
                        message: "Missing variation type",
                      },
                    ]}
                  >
                    <Select
                      disabled={!variation}
                      placeholder="Select Variation Type"
                      onChange={(value) => setVariationType(value)}
                      options={[
                        {
                          label: "Color",
                          value: "color",
                        },
                        {
                          label: "Size",
                          value: "size",
                        },
                      ]}
                    />
                  </Form.Item>
                  <div className="col-span-2 flex items-end gap-2">
                    <Form.Item
                      className="m-0 w-full"
                      label="Variation Value"
                      {...restField}
                      name={[name, "variation_value"]}
                      rules={[
                        {
                          required: variation,
                          message: "Missing variation value",
                        },
                      ]}
                    >
                      <Select
                        disabled={!variation}
                        placeholder="Select Variation Value"
                        showSearch
                        mode="multiple"
                        tagRender={tagRender}
                        options={
                          variationType === "color"
                            ? colorOptions
                            : variationType === "size"
                            ? sizeOptions
                            : []
                        }
                      />
                    </Form.Item>
                    <BiMinusCircle
                      className="size-5 mb-2 cursor-pointer"
                      onClick={() => remove(name)}
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
          <JoditEditor
            ref={editor}
            value={content as string}
            config={config}
            onChange={(value) => setContent(value)}
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
