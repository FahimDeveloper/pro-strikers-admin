/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { useState } from "react";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { ColumnsType } from "antd/es/table";
import { BsThreeDots } from "react-icons/bs";
import { useFacilityReservationsQuery } from "../../../redux/features/reservation/facilityReservation";
import AddFacilityReservationModal from "../../../components/ui/modal/AddFacilityReservationModal";
import moment from "moment";
import DeleteFacilityReservationPopup from "../../../components/ui/popup/DeleteFacilityReservationPopup";
import UpdateFacilityReservationModal from "../../../components/ui/modal/UpdateFacilityReservationModal";

const FacilityReservation = () => {
  const [sport, setSport] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useFacilityReservationsQuery({
    search,
    sport,
    page,
    limit,
  });

  const onChange = (value: string) => {
    if (value == "all") {
      setSport(undefined);
    } else {
      setSport(value);
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
      width: 140,
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
      sorter: (a, b) => a.category.localeCompare(b.category),
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
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("MMMM Do YYYY")}
        </p>
      ),
      sorter: (a, b) => a.trainer.localeCompare(b.trainer),
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
            label: <UpdateFacilityReservationModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteFacilityReservationPopup id={record?._id} />,
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
            Facility Reservation
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} reservation available
          </p>
        </div>
        <AddFacilityReservationModal />
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search reservation by email or phone number"
          className="text-sm col-span-2 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full col-span-1"
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

export default FacilityReservation;
