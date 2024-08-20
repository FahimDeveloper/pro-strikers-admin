/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddCourseModal from "../../../components/ui/modal/AddCourseModal";
import { useCoursesQuery } from "../../../redux/features/schedule/courseScheduleApi";
import { ICourseSchedule } from "../../../types/couse.types";
import { BsThreeDots } from "react-icons/bs";
import UpdateCourseModal from "../../../components/ui/modal/UpdateCourseModal";
import DeleteCoursePopup from "../../../components/ui/popup/DeleteCoursePopup";
import moment from "moment";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const CourseScheduling = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useCoursesQuery({
    search,
    page,
    limit,
    sport,
    trainer,
  });
  const { Paragraph } = Typography;
  const { data: trainerData } = useTrainersQuery(undefined);
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
  const columns: ColumnsType<ICourseSchedule> = [
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
      title: "Bootcamp ID",
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
      width: 180,
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
      width: 220,
      title: "Bootcamp Name",
      align: "center",
      dataIndex: "course_name",
      key: "coruse_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.course_name.localeCompare(b.course_name),
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
      width: 140,
      title: "Start Date",
      align: "center",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
    },
    {
      width: 140,
      title: "End Date",
      align: "center",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
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
            label: <UpdateCourseModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteCoursePopup id={record?._id} />,
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
              Bootcamps
            </h2>
            <p className="text-[#838383] font-semibold text-lg">
              {data?.count || 0} bootcamps available
            </p>
          </div>
          <AddCourseModal />
        </div>
        <div className="flex gap-2 items-center">
          <Input.Search
            onSearch={onSearch}
            placeholder="Search Bootcamp"
            className="text-sm font-medium text-[#5D5D5D]"
          />
          <div className="flex gap-2 items-center">
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

export default CourseScheduling;
