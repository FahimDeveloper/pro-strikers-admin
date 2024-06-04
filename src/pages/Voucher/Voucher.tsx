/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddVoucherModal from "../../components/ui/modal/AddVoucherModal";
import { useVouchersQuery } from "../../redux/features/voucher/voucherApi";
import { IVoucher } from "../../types/voucher.types";
import UpdateVoucherModal from "../../components/ui/modal/UpdateVoucherModal";
import DeleteVoucherPopup from "../../components/ui/popup/DeleteVoucherPopup";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";

const Voucher = () => {
  const [service, setService] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useVouchersQuery({
    search,
    voucher_type: service,
    page,
    limit,
  });
  const columns: ColumnsType<IVoucher> = [
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
      title: "Voucher code",
      dataIndex: "voucher_code",
      key: "voucher_code",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 160,
      align: "center",
      title: "Discount Type",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.discount_type.localeCompare(b.discount_type),
    },
    {
      width: 120,
      align: "center",
      title: "Discount",
      dataIndex: "discount_value",
      key: "discount_value",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.discount_value - b.discount_value,
    },
    {
      width: 140,
      align: "center",
      title: "Voucher Type",
      dataIndex: "voucher_type",
      key: "voucher_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.voucher_type.localeCompare(b.voucher_type),
    },
    {
      width: 160,
      align: "center",
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
      width: 160,
      align: "center",
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
      width: 120,
      align: "center",
      title: "Used",
      dataIndex: "used",
      key: "used",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.used - b.used,
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
            label: <UpdateVoucherModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteVoucherPopup id={record?._id} />,
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

  const onChange = (value: string) => {
    if (value == "all") {
      setService(undefined);
    } else {
      setService(value);
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
            Vouchers
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} voucher available
          </p>
        </div>
        <AddVoucherModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search voucher"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full col-span-1"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value)}
          filterOption={filterOption}
          options={[
            {
              label: "All Service",
              value: "all",
            },
            {
              label: "General",
              value: "general",
            },
            {
              label: "Membership",
              value: "membership",
            },
            {
              label: "Appointment",
              value: "appointment",
            },
            {
              label: "Facility",
              value: "facility",
            },
            {
              label: "Class",
              value: "class",
            },
            {
              label: "Course",
              value: "course",
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

export default Voucher;
