/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TimePicker,
} from "antd";
import { IBundleCreditPackResponse } from "../../../types/bundle-package.type";
import { useEffect } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

const BundleCreditPackForm = ({
  record,
  form,
  onFinish,
  loading,
}: {
  record: IBundleCreditPackResponse;
  form: any;
  onFinish: any;
  loading: boolean;
}) => {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    form.setFieldsValue({
      active: record?.active ? record?.active : false,
    });
  }, [record, form]);
  return (
    <Form
      onFinish={onFinish}
      form={form}
      layout="vertical"
      className="space-y-3"
      initialValues={{
        active: record?.active,
        package: record?.package,
        piching_machine: record?.piching_machine,
        email: record?.email,
        hours: record?.hours,
        validity: record?.validity ? dayjs(record?.validity) : "",
        attendance: record?.attendance?.map((item) => {
          return {
            times: item?.times?.map((time) => {
              return {
                ...time,
                start_time: dayjs(time?.start_time).tz("America/Los_Angeles"),
                end_time: dayjs(time?.end_time).tz("America/Los_Angeles"),
              };
            }),
            date: dayjs(item.date),
          };
        }),
      }}
    >
      <Form.Item
        label="Activity"
        name="active"
        className="m-0"
        valuePropName="checked"
        rules={[{ required: true, message: "Activity required" }]}
      >
        <Switch checkedChildren="Active" unCheckedChildren="In Active" />
      </Form.Item>
      <Form.Item
        label="Package name"
        name="package"
        className="m-0"
        rules={[{ required: true, message: "Pacakge required" }]}
      >
        <Input placeholder="Enter purchasing package name" readOnly />
      </Form.Item>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item
          label="Email"
          name="email"
          className="m-0"
          rules={[{ required: true, message: "Email required" }]}
        >
          <Input placeholder="Enter user email" readOnly />
        </Form.Item>
        <Form.Item
          label="Hours"
          name="hours"
          className="m-0"
          rules={[{ required: true, message: "Hours required" }]}
        >
          <Select
            placeholder="Select package hours"
            options={[
              {
                label: "5 Hours",
                value: 5,
              },
              {
                label: "10 Hours",
                value: 10,
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Form.Item
          label="Piching Machine"
          name="piching_machine"
          className="m-0"
          rules={[{ required: true, message: "" }]}
        >
          <Select
            placeholder="Select one"
            options={[
              {
                label: "Yes",
                value: true,
              },
              {
                label: "No",
                value: false,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Validity"
          name="validity"
          className="m-0"
          rules={[{ required: true, message: "" }]}
        >
          <DatePicker
            placeholder="Select package validity"
            className="w-full"
          />
        </Form.Item>
      </div>
      <Form.List name="attendance">
        {(fields, { add, remove }) => (
          <div className="pt-4 space-y-3">
            <Button type="primary" onClick={() => add()} size="large">
              Add new attendace
            </Button>
            <div className="space-y-7">
              {fields.map(({ key, name, ...resetField }, index) => (
                <div key={key} className="space-y-3">
                  <div className="flex gap-3">
                    <Form.Item
                      {...resetField}
                      name={[name, "date"]}
                      label={`Attendance Date ${index + 1}`}
                      className="m-0"
                      rules={[{ required: true, message: "Date is required" }]}
                    >
                      <DatePicker
                        className="w-64"
                        placeholder="Enter attendance date"
                      />
                    </Form.Item>
                    <Form.Item className="m-0" label="Remove">
                      <Button danger onClick={() => remove(name)}>
                        Remove
                      </Button>
                    </Form.Item>
                  </div>
                  <Form.List name={[name, "times"]}>
                    {(fields, { add, remove }) => (
                      <div className="space-y-2">
                        <Button type="primary" onClick={() => add()}>
                          Add new attempt
                        </Button>
                        <div className="space-y-2">
                          {fields.map(({ key, name, ...resetField }) => (
                            <div key={key} className="grid grid-cols-10 gap-3">
                              <div className="col-span-8 grid grid-cols-3 gap-3">
                                <Form.Item
                                  {...resetField}
                                  name={[name, "cage"]}
                                  label={`Cage`}
                                  className="m-0"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Cage required",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="Select cage"
                                    options={[
                                      {
                                        label: "Cricket Cage",
                                        value: "cricket cage",
                                      },
                                      {
                                        label: "Baseball Cage",
                                        value: "baseball cage",
                                      },
                                      {
                                        label: "Softball Cage",
                                        value: "softball cage",
                                      },
                                    ]}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...resetField}
                                  name={[name, "start_time"]}
                                  label={`Start Time`}
                                  className="m-0"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Start time required",
                                    },
                                  ]}
                                >
                                  <TimePicker
                                    placeholder="Enter start time"
                                    use12Hours
                                    className="w-full"
                                    format="HH:mm A"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...resetField}
                                  name={[name, "end_time"]}
                                  label={`End Time`}
                                  className="m-0"
                                  rules={[
                                    {
                                      required: true,
                                      message: "End time required",
                                    },
                                  ]}
                                >
                                  <TimePicker
                                    placeholder="Enter end time"
                                    use12Hours
                                    className="w-full"
                                    format="HH:mm A"
                                  />
                                </Form.Item>
                              </div>
                              <Form.Item
                                {...resetField}
                                name={[name, "hour"]}
                                label={`Hour`}
                                className="m-0 col-span-1"
                                rules={[
                                  { required: true, message: "required" },
                                ]}
                              >
                                <InputNumber
                                  min={1}
                                  className="w-full"
                                  placeholder="Enter attempt hour"
                                />
                              </Form.Item>
                              <Form.Item
                                className="m-0 col-span-1"
                                label="Remove"
                              >
                                <Button danger onClick={() => remove(name)}>
                                  Remove
                                </Button>
                              </Form.Item>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Form.List>
                </div>
              ))}
            </div>
          </div>
        )}
      </Form.List>
      <Form.Item className="text-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BundleCreditPackForm;
