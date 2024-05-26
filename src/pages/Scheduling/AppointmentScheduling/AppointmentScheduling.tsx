/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddAppointmentModal from "../../../components/ui/modal/AddAppointmentModal";

const AppointmentScheduling = () => {
  const [appointmentType, setAppointmentType] = useState("");
  const [sport, setSport] = useState("");
  const [trainer, setTrainer] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        appointment_name: "Kids Training",
        appointment_type: "Cricket Cage",
        sport: "Cricket",
        trainer: "Kavindu",
        duration: 30,
        price: 50,
      },
      {
        _id: "124",
        appointment_name: "Group Training",
        appointment_type: "Soccer Cage",
        sport: "Soccer",
        trainer: "Fahim",
        duration: 30,
        price: 55,
      },
      {
        _id: "125",
        appointment_name: "One on One Training",
        appointment_type: "Baseball Cage",
        sport: "Baseball",
        trainer: "Hasan",
        duration: 60,
        price: 45,
      },
    ],
  };
  const columns: ColumnsType<any> = [
    {
      width: 70,
      align: "center",
      title: "S/N",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => {
        return <>{page * pageSize + index + 1 - pageSize}</>;
      },
    },
    {
      title: "Appointment Name",
      align: "center",
      dataIndex: "appointment_name",
      key: "appointment_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.appointment_name.localeCompare(b.appointment_name),
    },
    {
      title: "Appointment Type",
      align: "center",
      dataIndex: "appointment_type",
      key: "appointment_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.appointment_type.localeCompare(b.appointment_type),
    },
    {
      title: "Sport",
      align: "center",
      dataIndex: "sport",
      key: "sport",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.sport.localeCompare(b.sport),
    },
    {
      title: "Trainer",
      align: "center",
      dataIndex: "trainer",
      key: "trainer",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      title: "Duration",
      align: "center",
      dataIndex: "duration",
      key: "duration",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {text} minutes
        </p>
      ),
      sorter: (a: { duration: number }, b: { duration: number }) =>
        a.duration - b.duration,
    },
    {
      title: "Fee",
      align: "center",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">$ {text}</p>
      ),
      sorter: (a: { price: number }, b: { price: number }) => a.price - b.price,
    },
    {
      fixed: "right",
      align: "center",
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => {
        return <div></div>;
      },
    },
  ];
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setPageSize(size);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value: string, filter: string) => {
    if (filter === "appointment_type") {
      setAppointmentType(value);
    } else if (filter === "sport") {
      setSport(value);
    } else if (filter === "trainer") {
      setTrainer(value);
    }
    console.log(appointmentType, sport, trainer);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Appointments
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} appointments available
          </p>
        </div>
        <AddAppointmentModal />
      </div>
      <div className="flex gap-2 items-center">
        <Input.Search
          placeholder="Search Classes"
          className="text-sm font-medium text-[#5D5D5D]"
        />
        <div className="flex gap-2 items-center">
          <Select
            className="w-full"
            showSearch
            defaultValue={"all"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "appointment_type")}
            filterOption={filterOption}
            options={[
              {
                label: "All Appointments",
                value: "all",
              },
              {
                label: "One on One",
                value: "one on one",
              },
              {
                label: "Group training",
                value: "group training",
              },
            ]}
          />
          <Select
            className="w-full"
            showSearch
            defaultValue={"all sport"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "sport")}
            filterOption={filterOption}
            options={[
              {
                label: "All Sport",
                value: "all sport",
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
          <Select
            className="w-full"
            showSearch
            defaultValue={"all trainer"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "trainer")}
            filterOption={filterOption}
            options={[
              {
                label: "All Trainer",
                value: "all trainer",
              },
              {
                label: "Kavindu",
                value: "kavindu",
              },
              {
                label: "Fahim",
                value: "fahim",
              },
              {
                label: "Hasan",
                value: "hasan",
              },
            ]}
          />
        </div>
      </div>
      <DataTable columns={columns} data={data?.results || []} loading={false} />
      <DataPagination
        onChange={handlePageChange}
        page={page}
        pageSize={pageSize}
        total={data?.count || 0}
      />
    </div>
  );
};

export default AppointmentScheduling;
