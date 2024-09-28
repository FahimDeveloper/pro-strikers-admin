/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { useState } from "react";
import AddClassesModal from "../../../components/ui/modal/AddClassModal";
import { useClassesQuery } from "../../../redux/features/schedule/classScheduleApi";
import { IClassSchedule } from "../../../types/class.types";
import { BsThreeDots } from "react-icons/bs";
import DeleteClassPopup from "../../../components/ui/popup/DeleteClassPopup";
import UpdateClassModal from "../../../components/ui/modal/UpdateClassModal";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const ClassesScheduling = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [facility, setFacility] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [level, setLevel] = useState<string | undefined>(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useClassesQuery({
    search,
    page,
    limit,
    sport,
    facility,
    trainer,
    level,
  });

  const { Paragraph } = Typography;

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

  const columns: ColumnsType<IClassSchedule> = [
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
      title: "Class ID",
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
      width: 220,
      title: "Class Name",
      align: "center",
      dataIndex: "class_name",
      key: "class_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.class_name.localeCompare(b.class_name),
    },
    {
      width: 180,
      title: "Facility",
      align: "center",
      dataIndex: "facility",
      key: "facility",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.facility.localeCompare(b.facility),
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
    },
    {
      width: 140,
      title: "Level",
      align: "center",
      dataIndex: "level",
      key: "level",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.level.localeCompare(b.level),
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
            label: <UpdateClassModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteClassPopup id={record?._id} />,
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
    if (filter === "facility") {
      if (value === "all") {
        setFacility(undefined);
      } else {
        setFacility(value);
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
    } else if (filter === "level") {
      if (value === "all") {
        setLevel(undefined);
      } else {
        setLevel(value);
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
              Classes
            </h2>
            <p className="text-[#838383] font-semibold text-lg">
              {data?.count || 0} classes available
            </p>
          </div>
          <AddClassesModal />
        </div>
        <div className="flex gap-2 items-center">
          <Input.Search
            placeholder="Search Classes"
            onSearch={onSearch}
            className="text-sm font-medium text-[#5D5D5D]"
          />
          <div className="flex gap-2 items-center">
            <Select
              className="w-full"
              showSearch
              defaultValue={"all"}
              optionFilterProp="children"
              onChange={(value) => onChange(value, "facility")}
              filterOption={filterOption}
              options={[
                {
                  label: "All Facility",
                  value: "all",
                },
                {
                  label: "Cricket Cage",
                  value: "cricket cage",
                },
                {
                  label: "Soccer Cage",
                  value: "soccer cage",
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
                  label: "Hockey Cage",
                  value: "hockey cage",
                },
              ]}
            />
            <Select
              className="w-full"
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
              placeholder="Select level"
              defaultValue={"all"}
              onChange={(value) => onChange(value, "level")}
              options={[
                {
                  label: "All Level",
                  value: "all",
                },
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

export default ClassesScheduling;
