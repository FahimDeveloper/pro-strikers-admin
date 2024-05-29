import { Button, Form, Input, Select } from "antd";
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TProp = {
  record?: any;
  onFinish: any;
  form: any;
  loading: boolean;
};
const PostForm = ({ record, onFinish, form, loading }: TProp) => {
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
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        title: record?.title,
        category: record?.category,
        description: record?.description,
        content: record?.content,
      }}
      className="space-y-3"
    >
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
        {/* // <Input.TextArea placeholder="Enter the content" rows={6} /> */}
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button loading={loading} htmlType="submit" className="primary-btn">
          Create post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
