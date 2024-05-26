/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddUserModal from "../../components/ui/modal/AddUserModal";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";

const Users = () => {
  const [membership, setMembership] = useState<boolean>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Hasan Basan",
        email: "info@gmail.com",
        phone: "01916160514",
        membership: true,
      },
      {
        _id: "124",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Fahim",
        email: "info@gmail.com",
        phone: "01916160514",
        membership: false,
      },
      {
        _id: "125",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Fuyad",
        email: "info@gmail.com",
        phone: "01916160514",
        membership: true,
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
      title: "Client Name",
      align: "center",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "email",
      align: "center",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Phone",
      align: "center",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Membership",
      align: "center",
      dataIndex: "membership",
      key: "membership",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {text === true ? "Yes" : "No"}
        </p>
      ),
      sorter: (a: { membership: boolean }, b: { membership: boolean }) =>
        Number(a.membership) - Number(b.membership),
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

  const onChange = (value: string) => {
    if (value === "membership") {
      setMembership(true);
    } else if (value === "no membership") {
      setMembership(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Clients
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} clients available
          </p>
        </div>
        <AddUserModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          placeholder="Search Classes"
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
              label: "All Client",
              value: "all",
            },
            {
              label: "Membership",
              value: "membership",
            },
            {
              label: "Non membership",
              value: "non membership",
            },
          ]}
        />
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

export default Users;
