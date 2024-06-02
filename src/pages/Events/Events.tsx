/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddEventModal from "../../components/ui/modal/AddEventModal";
import { useEventsQuery } from "../../redux/features/event/eventApi";
import { IEvent } from "../../types/event.types";
import moment from "moment";
import UpdateEventModal from "../../components/ui/modal/UpdateEventModal";
import DeleteEventPopup from "../../components/ui/popup/DeleteEventPopup";
import { BsThreeDots } from "react-icons/bs";

const Events = () => {
  const [event, setEvent] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading } = useEventsQuery({
    search,
    event_type: event,
    sport,
    page,
    limit,
  });
  const columns: ColumnsType<IEvent> = [
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
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      key: "event_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.event_type.localeCompare(b.event_type),
    },
    {
      title: "Sport",
      dataIndex: "sport",
      key: "sport",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.event_type.localeCompare(b.event_type),
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.start_date) - Number(b.start_date),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.end_date) - Number(b.end_date),
    },
    {
      title: "Registration",
      dataIndex: "registration",
      key: "registration",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.registration - b.registration,
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
            label: <UpdateEventModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteEventPopup id={record?._id} />,
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
    if (filter == "eventType") {
      if (value === "all") {
        setEvent(undefined);
      } else {
        setEvent(value);
      }
    } else if (filter === "sportType") {
      if (value === "all") {
        setSport(undefined);
      } else {
        setSport(value);
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
          onSearch={onSearch}
          placeholder="Search events"
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
            onChange={(value) => onChange(value, "sportType")}
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

export default Events;
