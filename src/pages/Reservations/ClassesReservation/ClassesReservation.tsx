/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { ColumnsType } from "antd/es/table";
import { BsThreeDots } from "react-icons/bs";
import { useClassReservationsQuery } from "../../../redux/features/reservation/classReservation";
import AddClassReservationModal from "../../../components/ui/modal/AddClassReservationModal";
import moment from "moment";
import DeleteClassReservationPopup from "../../../components/ui/popup/DeleteCalssReservationPopup";
import UpdateClassReservationModal from "../../../components/ui/modal/UpdateClassReservationModal";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const ClassesReservation = () => {
  const { data: trainerData } = useTrainersQuery(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useClassReservationsQuery({
    search,
    sport,
    trainer,
    page,
    limit,
  });
  const onChange = (value: string, filter: string) => {
    if (filter === "sport") {
      if (value == "all") {
        setSport(undefined);
      } else {
        setSport(value);
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
      title: "Name",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {record?.first_name} {record?.last_name}
        </p>
      ),
    },
    {
      width: 280,
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Sport",
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
      width: 160,
      align: "center",
      title: "Voucher Applied",
      dataIndex: "voucher_applied",
      key: "voucher_applied",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text ? "Yes" : "No"}
        </p>
      ),
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
    },
    {
      width: 160,
      align: "center",
      title: "Issue Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
    },
    {
      width: 160,
      align: "center",
      title: "Class Date",
      dataIndex: "class_date",
      key: "class_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("MMMM Do YYYY")}
        </p>
      ),
    },
    {
      width: 160,
      align: "center",
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      width: 160,
      align: "center",
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      width: 160,
      align: "center",
      title: "Zip/Postal Code",
      dataIndex: "zip_code",
      key: "zip_code",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => Number(a.zip_code) - Number(b.zip_code),
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
            label: <UpdateClassReservationModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteClassReservationPopup id={record?._id} />,
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
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Class Reservation
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count} reservation available
          </p>
        </div>
        <AddClassReservationModal />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search reservation by email or phone number"
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

export default ClassesReservation;
