/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddAdminModal from "../../components/ui/modal/AddAdminModal";
import { useAdminsQuery } from "../../redux/features/admin/adminApi";
import UpdateAdminModal from "../../components/ui/modal/UpdateAdminModal";
import DeleteAdminPopup from "../../components/ui/popup/DeleteAdminPopup";
import { BsThreeDots } from "react-icons/bs";

const TeamMembers = () => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useAdminsQuery({
    search,
    role,
    page,
    limit,
  });
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
      width: 260,
      title: "Member Name",
      align: "center",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => (
        <div className="flex items-center ms-5 gap-5">
          <Image
            src={record?.image}
            style={{ width: 50, height: 50, objectFit: "contain" }}
          />
          <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
            {record?.first_name} {record?.last_name}
          </p>
        </div>
      ),
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      width: 120,
      title: "Role",
      align: "center",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      width: 260,
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 160,
      title: "Phone",
      align: "center",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 80,
      fixed: "right",
      align: "center",
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <UpdateAdminModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteAdminPopup id={record?._id} />,
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

  const onChange = (value: string) => {
    if (value === "all") {
      setRole(undefined);
    } else {
      setRole(value);
    }
  };

  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
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
          onSearch={onSearch}
          allowClear
          placeholder="Search by member name or email"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
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
              label: "All Member",
              value: "all",
            },
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "Super Admin",
              value: "super-admin",
            },
            {
              label: "Trainer",
              value: "trainer",
            },
            {
              label: "Manager",
              value: "manager",
            },
            {
              label: "Staff",
              value: "staff",
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

export default TeamMembers;
