/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddVoucherModal from "../../components/ui/modal/AddVoucherModal";

const Voucher = () => {
  const [service, setService] = useState<string>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        voucher: "SPRING5038",
        discount: 20,
        voucher_type: "membership",
        discount_type: "percentage",
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        used: 60,
      },
      {
        _id: "124",
        voucher: "SPRING5038",
        discount: 30,
        voucher_type: "appointment",
        discount_type: "money",
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        used: 60,
      },
      {
        _id: "125",
        voucher: "SPRING5038",
        discount: 25,
        voucher_type: "facility",
        discount_type: "percentage",
        start_date: "25-02-2025",
        end_date: "25-02-2025",
        used: 60,
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
      title: "Voucher code",
      dataIndex: "voucher",
      key: "voucher",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Discount Type",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.discount_type.localeCompare(b.discount_type),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.discount - b.discount,
    },
    {
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
      title: "Used",
      dataIndex: "used",
      key: "used",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.used - b.used,
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

  const onChange = (value: string) => {
    if (value == "all") {
      setService("");
    } else {
      setService(value);
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
          ]}
        />
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

export default Voucher;
