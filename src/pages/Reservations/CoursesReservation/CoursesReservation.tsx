/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { ColumnsType } from "antd/es/table";
import { BsThreeDots } from "react-icons/bs";
import { useCourseReservationsQuery } from "../../../redux/features/reservation/coursesReservation";
import AddCourseReservationModal from "../../../components/ui/modal/AddCourseReservationModal";
import DeleteCourseReservationPopup from "../../../components/ui/popup/DeleteCourseReservationPopup";
import UpdateCourseReservationModal from "../../../components/ui/modal/UpdateCourseReservationModal";
// import { useTrainersQuery } from "../../../redux/features/admin/adminApi";
import { ICourseReservation } from "../../../types/couse.types";
import { collectDateStatus } from "../../../utils/collectDateStatus";
import DetailsCourseReservationModal from "../../../components/ui/modal/DetailsCourseReservationModal";
import moment from "moment";
import { useTrainersQuery } from "../../../redux/features/admin/adminApi";

const CoursesReservation = () => {
  const { data: trainerData } = useTrainersQuery(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useCourseReservationsQuery({
    search,
    trainer,
    sport,
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
  const columns: ColumnsType<ICourseReservation> = [
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
      width: 180,
      align: "center",
      title: "Player Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {record?.first_name} {record?.last_name}
        </p>
      ),
    },
    {
      width: 260,
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 160,
      align: "center",
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 140,
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
      width: 120,
      align: "center",
      title: "Status",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => {
        const status = collectDateStatus(
          record.course.end_date,
          record.course.start_date
        );
        return (
          <p className="font-medium text-sm leading-5 text-[#151515]">
            {status === "completed" && (
              <div className="px-2 py-1 bg-[#D6FFC8] rounded-md text-[#0D2B03]">
                Completed
              </div>
            )}
            {status === "running" && (
              <div className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-md">
                Running
              </div>
            )}
            {status === "upcoming" && (
              <div className="px-2 py-1 bg-[#FFF3C8] rounded-md text-[#6A5300]">
                Upcoming
              </div>
            )}
          </p>
        );
      },
    },
    {
      width: 140,
      align: "center",
      title: "Trainer",
      dataIndex: "trainer",
      key: "trainer",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text?.first_name} {text?.last_name}
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
      width: 90,
      align: "center",
      fixed: "right",
      title: "Details",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => <DetailsCourseReservationModal record={record} />,
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
            label: <UpdateCourseReservationModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteCourseReservationPopup id={record._id!} />,
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
            Bootcamp Reservation
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} reservation available
          </p>
        </div>
        <AddCourseReservationModal />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search by player name or email"
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

export default CoursesReservation;
