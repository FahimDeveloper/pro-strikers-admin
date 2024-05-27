/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddEventModal from "../../components/ui/modal/AddEventModal";

const Events = () => {
  const [event, setEvent] = useState<string>();
  const [sport, setSport] = useState<string>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        event_name: "Regional Hockey Tournament",
        event_type: "tournament",
        allowed_registrations: 16,
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        price: 60,
      },
      {
        _id: "124",
        event_name: "Spring Cricket League 2024",
        event_type: "league",
        allowed_registrations: 16,
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        price: 60,
      },
      {
        _id: "125",
        event_name: "Winter Softball League",
        event_type: "tournament",
        allowed_registrations: 16,
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        price: 60,
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
        return <>{page * limit + index + 1 - limit}</>;
      },
    },
    {
      title: "Event name",
      dataIndex: "event_name",
      key: "event_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      key: "event_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.event_type.localeCompare(b.event_type),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.start_date.localeCompare(b.start_date),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
    },
    {
      title: "Registrations",
      dataIndex: "allowed_registrations",
      key: "allowed_registrations",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.allowed_registrations - b.allowed_registrations,
    },
    {
      fixed: "right",
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
    if (filter == "eventType") {
      if (value === "all") {
        setEvent("");
      } else {
        setEvent(value);
      }
    } else if (filter === "sportType") {
      if (value === "all") {
        setSport("");
      } else {
        setSport(value);
      }
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Events
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} event available
          </p>
        </div>
        <AddEventModal />
      </div>
      <div className="grid grid-cols-9 gap-2 items-center">
        <Input.Search
          placeholder="Search voucher"
          className="text-sm col-span-6 font-medium text-[#5D5D5D]"
        />
        <div className="col-span-3 flex gap-2">
          <Select
            className="w-full"
            showSearch
            defaultValue={"all"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "eventType")}
            filterOption={filterOption}
            options={[
              {
                label: "All Events",
                value: "all",
              },
              {
                label: "Tournament",
                value: "tournament",
              },
              {
                label: "League",
                value: "league",
              },
            ]}
          />
          <Select
            className="w-full"
            showSearch
            defaultValue={"all"}
            optionFilterProp="children"
            onChange={(value) => onChange(value, "eventType")}
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
        </div>
      </div>
      <DataTable columns={columns} data={data?.results || []} loading={false} />
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.count || 0}
      />
    </div>
  );
};

export default Events;
