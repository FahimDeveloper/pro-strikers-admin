/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, TimePicker, Switch, Input } from "antd";
import dayjs from "dayjs";

const ScheduleForm = ({ record, form }: any) => {
  const schedules = [
    { day: "Monday", active: false, start_time: "", end_time: "" },
    { day: "Tuesday", active: false, start_time: "", end_time: "" },
    { day: "Wednesday", active: false, start_time: "", end_time: "" },
    { day: "Thursday", active: false, start_time: "", end_time: "" },
    { day: "Friday", active: false, start_time: "", end_time: "" },
    { day: "Saturday", active: false, start_time: "", end_time: "" },
    { day: "Sunday", active: false, start_time: "", end_time: "" },
  ];

  const initialValues = {
    schedules:
      record?.schedules.map((schedule: any) => ({
        ...schedule,
        start_time:
          schedule?.start_time?.length > 1
            ? dayjs(schedule.start_time, "HH:mm A")
            : "",
        end_time:
          schedule?.end_time?.length > 1
            ? dayjs(schedule.end_time, "HH:mm A")
            : "",
      })) || schedules,
  };

  return (
    <Form form={form} initialValues={initialValues}>
      <Form.List name="schedules">
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="flex justify-between gap-5 mb-4">
                <div className="flex items-center gap-3 w-1/3">
                  <Form.Item
                    {...restField}
                    name={[name, "active"]}
                    valuePropName="checked"
                    className="m-0"
                    rules={[{ required: true }]}
                  >
                    <Switch size="small" />
                  </Form.Item>
                  <Form.Item
                    className="m-0"
                    {...restField}
                    name={[name, "day"]}
                  >
                    <Input
                      readOnly
                      className="border-none selection:border-none"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  className="w-full m-0"
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.schedules[name].active !==
                    curValues.schedules[name].active
                  }
                >
                  {({ getFieldValue }) => {
                    const active = getFieldValue(["schedules", name, "active"]);
                    return (
                      <div className="flex gap-5 items-center w-full">
                        <Form.Item
                          {...restField}
                          name={[name, "start_time"]}
                          className="m-0 w-full"
                          rules={[
                            {
                              required: active,
                              message: "Start time is required",
                            },
                          ]}
                        >
                          <TimePicker
                            disabled={active ? false : true}
                            format="HH:mm A"
                            use12Hours
                            className="w-full"
                            placeholder="Select Start time"
                          />
                        </Form.Item>
                        <p>to</p>
                        <Form.Item
                          {...restField}
                          name={[name, "end_time"]}
                          className="m-0 w-full"
                          rules={[
                            {
                              required: active,
                              message: "End time is required",
                            },
                          ]}
                        >
                          <TimePicker
                            disabled={active ? false : true}
                            format="HH:mm A"
                            use12Hours
                            className="w-full"
                            placeholder="Select End time"
                          />
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default ScheduleForm;
