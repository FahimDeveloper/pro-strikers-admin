/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Switch } from "antd";
import { useEffect, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";

type TProp = {
  form: any;
  loading: boolean;
  onFinish: any;
  record?: any;
};

const LaneForm = ({ form, loading, onFinish, record }: TProp) => {
  const [addon, setAddon] = useState(false);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        lane_title: record?.lane_title,
        description: record?.description,
        addons: record?.addons,
        addon: record?.addon || false,
      });
    }
    if (record?.addon) {
      setAddon(true);
    } else {
      setAddon(false);
    }
  }, [record, form]);
  return (
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
        rules={[{ required: true }]}
        name="addon"
        className="m-0"
        label="Addon"
        valuePropName="checked"
      >
        <Switch checked={addon} onChange={() => setAddon(!addon)} />
      </Form.Item>
      <Form.List name="addons">
        {(fields, { add: addOne, remove: removeOne }) => (
          <>
            <Form.Item className="m-0">
              <Button type="primary" disabled={!addon} onClick={() => addOne()}>
                Add Addon
              </Button>
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="space-y-4">
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
                    <Input disabled={!addon} placeholder="Enter your addon" />
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
                      disabled={!addon}
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
                    disabled={!addon}
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
  );
};

export default LaneForm;
