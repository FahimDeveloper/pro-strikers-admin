/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import AddFacilityModal from "../../../components/ui/modal/AddFacilityModal";
import { useFacilitiesQuery } from "../../../redux/features/schedule/facilityScheduleApi";
import { IFacilitySchedule } from "../../../types/facilitySchedule.types";

const FacilityScheduling = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [facility, setFacility] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [trainer, setTrainer] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading } = useFacilitiesQuery({
    search,
    facility,
    sport,
    trainer,
    page,
    limit,
  });
  const columns: ColumnsType<IFacilitySchedule> = [
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
      title: "Facility Name",
      align: "center",
      dataIndex: "facility_name",
      key: "facility_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.facility_name.localeCompare(b.facility_name),
    },
    {
      title: "Facility",
      align: "center",
      dataIndex: "facility",
      key: "facility",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.facility.localeCompare(b.facility),
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
    } else if (filter === "facility") {
      if (value === "all") {
        setFacility(undefined);
      } else {
        setFacility(value);
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
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Facilities
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} facilities available
          </p>
        </div>
        <AddFacilityModal />
      </div>
      <div className="flex gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search facility"
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
                label: "Hockey",
                value: "hockey",
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
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.count || 0}
      />
    </div>
  );
};

export default FacilityScheduling;
