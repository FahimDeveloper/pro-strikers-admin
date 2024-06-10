/* eslint-disable @typescript-eslint/no-explicit-any */
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
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";

type TProp = {
  record?: any;
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
const PostForm = ({
  record,
  onFinish,
  form,
  loading,
  fileList,
  setFileList,
}: TProp) => {
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
        title: record?.title,
        image: record?.image && [
          {
            uid: "-1",
            name: record?.image,
            status: "done",
            url: record?.image,
          },
        ],
        category: record?.category,
        description: record?.description,
        content: record?.content,
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
        layout="vertical"
        form={form}
        onFinish={onFinish}
        className="space-y-3"
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
          <p className="text-[#3A394B] text-sm">Upload Post Thumbnail</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            label="Post Title"
            name="title"
            className="m-0"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>
          <Form.Item
            label="Post Category"
            name="category"
            className="m-0"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select
              placeholder="Select category"
              options={[
                {
                  label: "General",
                  value: "general",
                },
                {
                  label: "Tournament",
                  value: "tournament",
                },
                {
                  label: "League",
                  value: "league",
                },
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
                  label: "Field Hockey",
                  value: "field hockey",
                },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Post Description"
          name="description"
          className="m-0"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter the sort description" rows={4} />
        </Form.Item>
        <Form.Item
          label="Post Content"
          name="content"
          className="m-0"
          rules={[{ required: true }]}
        >
          <JoditEditor
            ref={editor}
            value={content as string}
            config={config}
            onChange={(value) => setContent(value)}
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button loading={loading} htmlType="submit" className="primary-btn">
            {record && Object.keys(record).length > 0
              ? "Update Post"
              : "Create Post"}
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

export default PostForm;
