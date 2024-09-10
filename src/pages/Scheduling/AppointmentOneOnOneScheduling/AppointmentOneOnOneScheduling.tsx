/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddOneOnOneAppointmentModal from "../../../components/ui/modal/AddOneOnOneAppointmentModal";
import { useOneAppointmentsQuery } from "../../../redux/features/schedule/oneAppointmentScheduleApi";
import { IAppointmentSchedule } from "../../../types/appointmentSchedule.types";
import { BsThreeDots } from "react-icons/bs";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";
import UpdateOneOnOneAppointmentModal from "../../../components/ui/modal/UpdateOneOnOnAppointmentModal";
import DeleteOneOnOneAppointmentPopup from "../../../components/ui/popup/DeleteOneOnOneAppointmentPopup";

const AppointmentOneOnOneScheduling = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useOneAppointmentsQuery({
    search,
    page,
    limit,
    trainer,
    sport,
  });
  const { data: trainerData } = useTrainersQuery(undefined);
  const options = trainerData?.results?.map((trainer: any) => {
    return {
      value: trainer._id,
      label: `${trainer.first_name} ${trainer.last_name}`,
    };
  });
  let trainerOptions;
  if (options) {
    trainerOptions = [
      {
        label: "All Trainer",
        value: "all",
      },
      ...options,
    ];
  }
  const { Paragraph } = Typography;
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
      width: 240,
      title: "Appointment ID",
      align: "center",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <Paragraph
          copyable={{
            text: async () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve(text);
                }, 500);
              }),
          }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      width: 240,
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
      width: 150,
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
      width: 180,
      title: "Trainer",
      align: "center",
      dataIndex: "trainer",
      key: "trainer",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text !== null ? `${text.first_name} ${text.last_name}` : "Not Found"}
        </p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      width: 140,
      title: "Duration",
      align: "center",
      dataIndex: "duration",
      key: "duration",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text} minutes
        </p>
      ),
      sorter: (a, b) => a.duration! - b.duration!,
    },
    {
      width: 80,
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
      width: 100,
      fixed: "right",
      align: "center",
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <UpdateOneOnOneAppointmentModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteOneOnOneAppointmentPopup id={record?._id} />,
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
    if (filter === "sport") {
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
              One On One Appointments
            </h2>
            <p className="text-[#838383] font-semibold text-lg">
              {data?.count || 0} appointments available
            </p>
          </div>
          <AddOneOnOneAppointmentModal />
        </div>
        <div className="grid grid-cols-5 gap-2 items-center">
          <Input.Search
            onSearch={onSearch}
            placeholder="Search Appointment"
            className="text-sm font-medium col-span-3 text-[#5D5D5D]"
          />
          <div className="col-span-2 flex gap-2 items-center">
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
              options={trainerOptions}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data?.results || []}
          loading={isLoading || isFetching}
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

export default AppointmentOneOnOneScheduling;
