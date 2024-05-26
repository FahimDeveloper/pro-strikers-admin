/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddCourseModal from "../../../components/ui/modal/AddCourseModal";

const CourseScheduling = () => {
  // const [startDate,setStartDate]=useState()
  const [facility, setFacility] = useState("");
  const [sport, setSport] = useState("");
  const [trainer, setTrainer] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        course_name: "Kids Training",
        sport: "Cricket",
        trainer: "Kavindu",
        start_date: "20-01-2024",
        end_date: "20-01-2022",
        price: 50,
      },
      {
        _id: "124",
        course_name: "Group Training",
        sport: "Soccer",
        trainer: "Fahim",
        start_date: "20-01-2023",
        end_date: "20-01-2023",
        price: 55,
      },
      {
        _id: "125",
        course_name: "One on One Training",
        sport: "Baseball",
        trainer: "Hasan",
        start_date: "20-01-2022",
        end_date: "20-01-2024",
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
      title: "Course Name",
      align: "center",
      dataIndex: "course_name",
      key: "coruse_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.coruse_name.localeCompare(b.coruse_name),
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
      title: "Start Date",
      align: "center",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a: { start_date: string }, b: { start_date: string }) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    },
    {
      title: "End Date",
      align: "center",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a: { end_date: string }, b: { end_date: string }) =>
        new Date(a.end_date).getTime() - new Date(b.end_date).getTime(),
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
    if (filter === "facility") {
      setFacility(value);
    } else if (filter === "sport") {
      setSport(value);
    } else if (filter === "trainer") {
      setTrainer(value);
    }
    console.log(facility, sport, trainer);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Courses
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} courses available
          </p>
        </div>
        <AddCourseModal />
      </div>
      <div className="flex gap-2 items-center">
        <Input.Search
          placeholder="Search Course"
          className="text-sm font-medium text-[#5D5D5D]"
        />
        <div className="flex gap-2 items-center">
          <Select
            className="w-full"
            showSearch
            defaultValue={"all facility"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "facility")}
            filterOption={filterOption}
            options={[
              {
                label: "All Facility",
                value: "all facility",
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

export default CourseScheduling;
