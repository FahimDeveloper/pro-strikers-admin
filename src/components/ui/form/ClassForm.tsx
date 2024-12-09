/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import dayjs from "dayjs";

const ClassForm = ({ record, form }: any) => {
  const { data: trainerData } = useTrainersQuery(undefined);
  const trainerOptions = trainerData?.results?.map((trainer: any) => {
    return {
      label: `${trainer.first_name} ${trainer.last_name}`,
      value: trainer._id,
    };
  });
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        class_name: record?.class_name,
        sport: record?.sport,
        description: record?.description,
        // start_date: record?.start_date
        //   ? dayjs(record?.start_date, "DD/MM/YYYY")
        //   : "",
        // end_date: record?.end_date ? dayjs(record?.end_date, "DD/MM/YYYY") : "",
        facility: record?.facility,
        trainer: record?.trainer?._id,
        capacity: record?.capacity,
        level: record?.level,
        price: record?.price,
      });
    }
  }, [record, form]);
  return (
    <>
      <Form form={form} layout="vertical" className="space-y-4">
        <div className="flex gap-5">
          <Form.Item
            name="class_name"
            className="w-full m-0"
            label="Class Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter class name" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="level"
            className="w-full m-0"
            label="Level"
          >
            <Select
              placeholder="Select level"
              options={[
                {
                  label: "Basic",
                  value: "basic",
                },
                {
                  label: "Intermediate",
                  value: "intermediate",
                },
                {
                  label: "Advanced",
                  value: "advanced",
                },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          name="description"
          className="m-0"
          label="Description"
        >
          <Input.TextArea placeholder="Enter class description" rows={4} />
        </Form.Item>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {/* <Form.Item
            rules={[{ required: true }]}
            name="start_date"
            className="w-full m-0"
            label="Start Date"
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="end_date"
            className="w-full m-0"
            label="End Date"
          >
            <DatePicker className="w-full" format={"DD/MM/YYYY"} />
          </Form.Item> */}
          <Form.Item
            name="sport"
            className="w-full m-0"
            label="Sport"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select sport"
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
                  label: "Field Hockey",
                  value: "field hockey",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="trainer"
            className="w-full m-0"
            label="Trainer"
          >
            <Select placeholder="Select trainer" options={trainerOptions} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="capacity"
            className=" m-0"
            label="Capacity"
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter class capacity"
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="facility"
            className="w-full m-0"
            label="Facility"
          >
            <Select
              placeholder="Select facility"
              options={[
                {
                  label: "Cricket Cage",
                  value: "cricket cage",
                },
                {
                  label: "Soccer",
                  value: "soccer",
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
                  label: "Hockey",
                  value: "hockey",
                },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          rules={[{ required: true }]}
          name="price"
          className="m-0 w-48"
          label="Class Fee"
        >
          <InputNumber
            prefix="$"
            min={0}
            className="w-full"
            placeholder="Enter class price"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default ClassForm;
