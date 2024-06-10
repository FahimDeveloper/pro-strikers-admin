/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { ColumnsType } from "antd/es/table";
import DeleteVoucherPopup from "../../../components/ui/popup/DeleteVoucherPopup";
import { BsThreeDots } from "react-icons/bs";
import { useAppointmentOneOnOneReservationsQuery } from "../../../redux/features/reservation/appointmentOneOnOneReservatonApi";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const AppointmentOneOnOneReservation = () => {
  const { data: trainerData } = useTrainersQuery(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } =
    useAppointmentOneOnOneReservationsQuery({
      search,
      category,
      trainer,
      page,
      limit,
    });
  const options = trainerData?.results?.map((trainer: any) => {
    return {
      value: `${trainer.first_name} ${trainer.last_name}`,
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
  const onChange = (value: string, filter: string) => {
    if (filter === "sport") {
      if (value == "all") {
        setCategory(undefined);
      } else {
        setCategory(value);
      }
    } else if (filter === "trainer") {
      if (value == "all") {
        setTrainer(undefined);
      } else {
        setTrainer(value);
      }
    }
  };
  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setLimit(size);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };
  const columns: ColumnsType<any> = [
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
      width: 220,
      align: "center",
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 220,
      align: "center",
      title: "Appointment Name",
      dataIndex: "appointment",
      key: "appointment",
      render: (_, record) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {record?.appointment.appointment_name}
        </p>
      ),
      sorter: (a, b) =>
        a.appointment.appointment_name.localeCompare(
          b.appointment.appointment_name
        ),
    },
    {
      width: 120,
      align: "center",
      title: "Sport",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      width: 160,
      align: "center",
      title: "Trainer",
      dataIndex: "trainer",
      key: "trainer",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      width: 160,
      align: "center",
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      width: 160,
      align: "center",
      title: "Facility Date",
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      width: 80,
      align: "center",
      fixed: "right",
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <DeleteVoucherPopup id={record?._id} />,
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
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
          Appointment One On One Reservation
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.count || 0} reservation available
        </p>
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search voucher"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full col-span-1"
          showSearch
          defaultValue={"all"}
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
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value, "trainer")}
          filterOption={filterOption}
          options={trainerOptions}
        />
      </div>
      <DataTable
        columns={columns}
        data={data?.results || []}
        loading={isLoading || isFetching}
      />
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.count || 0}
      />
    </div>
  );
};

export default AppointmentOneOnOneReservation;
