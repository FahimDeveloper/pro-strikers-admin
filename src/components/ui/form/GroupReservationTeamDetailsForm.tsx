/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

const GroupReservationTeamDetailsForm = ({
  form,
  record,
}: {
  form: any;
  record: any;
}) => {
  useEffect(() => {
    form.setFieldsValue({
      team_name: record?.team_name,
      team: record?.team,
    });
  }, [record, form]);
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Team Name"
        name="team_name"
        rules={[{ required: true }]}
        className="my-3"
      >
        <Input placeholder="Enter your team name" className="w-1/2" />
      </Form.Item>
      <Form.List name="team">
        {(fields, { add, remove }) => (
          <div className="space-y-3">
            {fields.map(({ key, name, ...restField }, index) => (
              <div className="space-y-1" key={key}>
                <div className="flex gap-2 items-center">
                  <h4 className="font-medium text-base text-[#7B7B7B]">
                    Player
                    {index == 0 ? ` ${index + 1} (Team Lead)` : ` ${index + 1}`}
                  </h4>
                  <AiOutlineMinusCircle
                    className="size-4 cursor-pointer"
                    onClick={() => remove(name)}
                  />
                </div>
                <div className="grid grid-cols-5 gap-x-3 items-center">
                  <Form.Item
                    label="First Name"
                    className="my-1 col-span-2"
                    {...restField}
                    name={[name, "first_name"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="Type here..." />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    className="my-1 col-span-2"
                    {...restField}
                    name={[name, "last_name"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Type here..." />
                  </Form.Item>
                  <Form.Item
                    label="Age"
                    className="my-1"
                    {...restField}
                    name={[name, "age"]}
                    rules={[
                      { required: true, message: "Missing date of birth" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Type here..."
                      className="w-full"
                      min={0}
                      max={99}
                    />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-x-3">
                  <Form.Item
                    label="Email"
                    className="my-1"
                    {...restField}
                    name={[name, "email"]}
                    rules={[{ required: true, message: "Missing email" }]}
                  >
                    <Input placeholder="Type here..." />
                  </Form.Item>
                  <Form.Item
                    label="Contact"
                    className="my-1"
                    {...restField}
                    name={[name, "contact"]}
                    rules={[{ required: true, message: "Missing contact" }]}
                  >
                    <Input placeholder="Type here..." />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button type="primary" onClick={() => add()}>
                Add Member
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default GroupReservationTeamDetailsForm;
