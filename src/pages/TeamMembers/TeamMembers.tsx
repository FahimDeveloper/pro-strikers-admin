/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddAdminModal from "../../components/ui/modal/AddAdminModal";

const TeamMembers = () => {
  const [role, setRole] = useState<string>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Hasan Basan",
        role: "admin",
        email: "info@gmail.com",
        phone: "01916160514",
      },
      {
        _id: "124",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Fahim",
        role: "trainer",
        email: "info@gmail.com",
        phone: "01916160514",
      },
      {
        _id: "125",
        image: "https://avatar.iran.liara.run/public/boy",
        full_name: "Fuyad",
        role: "super admin",
        email: "info@gmail.com",
        phone: "01916160514",
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
      title: "Stuff name",
      align: "center",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => (
        <div className="flex items-center ms-10 gap-5">
          <Image src={record?.image} style={{ width: 50 }} />
          <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
        </div>
      ),
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Role",
      align: "center",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.role.localeCompare(b.role),
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

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Team Members
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} member available
          </p>
        </div>
        <AddAdminModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          placeholder="Search by member name or email"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full col-span-1"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => setRole(value)}
          filterOption={filterOption}
          options={[
            {
              label: "All Member",
              value: "all",
            },
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "Super Admin",
              value: "super admin",
            },
            {
              label: "Trainer",
              value: "trainer",
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

export default TeamMembers;
