/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddAppointmentModal from "../../../components/ui/modal/AddAppointmentModal";
import { useAppointmentsQuery } from "../../../redux/features/schedule/appointmentScheduleApi";
import { IAppointmentSchedule } from "../../../types/appointmentSchedule.types";
import DeleteAppointmentPopup from "../../../components/ui/popup/DeleteAppointmentPopup";
import UpdateAppointmentModal from "../../../components/ui/modal/UpdateAppointmentModal";
import { BsThreeDots } from "react-icons/bs";

const AppointmentScheduling = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState<string | undefined>(
    undefined
  );
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading } = useAppointmentsQuery({
    search,
    page,
    limit,
    appointment_type: appointmentType,
    trainer,
    sport,
  });
  const columns: ColumnsType<IAppointmentSchedule> = [
    {
      width: 70,
      align: "center",
      title: "S/N",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => {
        return <>{page * limit + index + 1 - limit}</>;
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
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.appointment_type.localeCompare(b.appointment_type),
    },
    {
      title: "Sport",
      align: "center",
      dataIndex: "sport",
      key: "sport",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.sport.localeCompare(b.sport),
    },
    {
      title: "Trainer",
      align: "center",
      dataIndex: "trainer",
      key: "trainer",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      title: "Duration",
      align: "center",
      dataIndex: "appointment_duration",
      key: "appointment_duration",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text} minutes
        </p>
      ),
      sorter: (a, b) => a.appointment_duration - b.appointment_duration,
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
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <UpdateAppointmentModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteAppointmentPopup id={record?._id} />,
          },
        ];
        return (
          <Dropdown menu={{ items }}>
            <BsThreeDots className="size-5 cursor-pointer" />
          </Dropdown>
        );
      },
    },
  ];
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setLimit(size);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value: string, filter: string) => {
    if (filter === "appointment_type") {
      if (value === "all") {
        setAppointmentType(undefined);
      } else {
        setAppointmentType(value);
      }
    } else if (filter === "sport") {
      if (value === "all") {
        setSport(undefined);
      } else {
        setSport(value);
      }
    } else if (filter === "trainer") {
      if (value === "all") {
        setTrainer(undefined);
      } else {
        setTrainer(value);
      }
    }
  };
  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
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
            onSearch={onSearch}
            placeholder="Search Appointment"
            className="text-sm font-medium text-[#5D5D5D]"
          />
          <div className="flex gap-2 items-center">
            <Select
              className="w-full"
              showSearch
              defaultValue="all"
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
              defaultValue="all"
              optionFilterProp="children"
              onChange={(value) => onChange(value, "sport")}
              filterOption={filterOption}
              options={[
                {
                  label: "All Sport",
                  value: "all",
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
            <Select
              className="w-full"
              showSearch
              defaultValue="all"
              optionFilterProp="children"
              onChange={(value) => onChange(value, "trainer")}
              filterOption={filterOption}
              options={[
                {
                  label: "All Trainer",
                  value: "all",
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
        <DataTable
          columns={columns}
          data={data?.results || []}
          loading={isLoading}
        />
      </div>
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.count || 0}
      />
    </div>
  );
};

export default AppointmentScheduling;
