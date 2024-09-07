import { Dropdown, Input, Select } from "antd";
import DataPagination from "../../../components/common/DataPagination";
import DataTable from "../../../components/common/DataTable";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { IEventGroupReservation } from "../../../types/event.types";
import { BsThreeDots } from "react-icons/bs";
import AddEventGroupReservationModal from "../../../components/ui/modal/AddEventGroupReservationModal";
import UpdateEventGroupReservationModal from "../../../components/ui/modal/UpdateEventGroupReservationModal";
import DeleteEventGroupReservationPopup from "../../../components/ui/popup/DeleteEventGroupReservationPopup";
import { useEventGroupReservationsQuery } from "../../../redux/features/reservation/eventGroupReservation";

const EventsGroupReservation = () => {
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useEventGroupReservationsQuery({
    search,
    sport,
    page,
    limit,
  });

  const handlePageChange = (page: number, size: number) => {
    setPage(page);
    setLimit(size);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value: string) => {
    if (value === "all") {
      setSport(undefined);
    } else {
      setSport(value);
    }
  };
  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };
  const columns: ColumnsType<IEventGroupReservation> = [
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
      title: "Team Name",
      dataIndex: "team_name",
      key: "team_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
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
      width: 180,
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
            label: <UpdateEventGroupReservationModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteEventGroupReservationPopup id={record._id!} />,
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
            Events Group Reservation
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} reservation available
          </p>
        </div>
        <AddEventGroupReservationModal />
      </div>
      <div className="grid grid-cols-9 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search reservation by Team name or email"
          className="text-sm col-span-6 font-medium text-[#5D5D5D]"
        />
        <div className="col-span-3 flex gap-2">
          <Select
            className="w-full"
            showSearch
            defaultValue={"all"}
            optionFilterProp="children"
            onChange={onChange}
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
        </div>
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

export default EventsGroupReservation;
