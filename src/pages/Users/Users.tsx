/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddUserModal from "../../components/ui/modal/AddUserModal";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import { useUsersQuery } from "../../redux/features/user/userApi";
import UpdateUserModal from "../../components/ui/modal/UpdateUserModal";
import DeleteUserPopup from "../../components/ui/popup/DeleteUserPopup";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { IUser } from "../../types/user.type";

const Users = () => {
  const [membership, setMembership] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading } = useUsersQuery({
    search,
    membership,
    page,
    limit,
  });
  const columns: ColumnsType<IUser> = [
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
      title: "Client Name",
      align: "center",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => (
        <div className="flex items-center ms-10 gap-5">
          <Image src={record?.image} style={{ width: 50 }} />
          <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
            {record?.first_name} {record?.last_name}
          </p>
        </div>
      ),
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Gender",
      align: "center",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.gender.localeCompare(b.gender),
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
      title: "Date of Birth",
      align: "center",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
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
      sorter: (a, b) => Number(a.membership) - Number(b.membership),
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
            label: <UpdateUserModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteUserPopup id={record?._id} />,
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
    if (value === "membership") {
      setMembership(true);
    } else if (value === "non membership") {
      setMembership(false);
    } else if (value === "all") {
      setMembership(undefined);
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
          placeholder="Search by user name or email"
          onSearch={onSearch}
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

export default Users;
