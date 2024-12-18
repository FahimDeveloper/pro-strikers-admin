/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Switch, TimePicker } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const ScheduleForm = ({ record, form }: any) => {
  const schedules = [
    {
      day: "Monday",
      active: false,
      time_range: [],
    },
    {
      day: "Tuesday",
      active: false,
      time_range: [],
    },
    {
      day: "Wednesday",
      active: false,
      time_range: [],
    },
    {
      day: "Thursday",
      active: false,
      time_range: [],
    },
    {
      day: "Friday",
      active: false,
      time_range: [],
    },
    {
      day: "Saturday",
      active: false,
      time_range: [],
    },
    {
      day: "Sunday",
      active: false,
      time_range: [],
    },
  ];

  dayjs.extend(weekday);
  dayjs.extend(localeData);
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const initialValues = {
    schedules:
      record?.schedules.map((schedule: any) => ({
        ...schedule,
        time_range:
          schedule?.start_time && schedule?.end_time
            ? [
                dayjs(schedule.start_time).tz("America/Los_Angeles"),
                dayjs(schedule.end_time).tz("America/Los_Angeles"),
              ]
            : [],
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
                          name={[name, "time_range"]}
                          className="m-0 w-full"
                          rules={[
                            {
                              required: active,
                              message: "time is required",
                            },
                          ]}
                        >
                          <TimePicker.RangePicker
                            disabled={active ? false : true}
                            format="HH:mm A"
                            use12Hours
                            className="w-full"
                          />
                        </Form.Item>
                        {/* <p>to</p>
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
                        </Form.Item> */}
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
