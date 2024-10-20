/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetMembershipCancellationQuery } from "../../redux/features/cancellation/cancellationApi";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import { Dropdown, Input } from "antd";
import { BsThreeDots } from "react-icons/bs";
import MembershipCancellationStatusModal from "../../components/ui/modal/MembershipCancellationStatusModal";

const MembershipCancellation = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, isLoading, isFetching } = useGetMembershipCancellationQuery({
    page,
    limit,
    search,
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
      align: "center",
      width: 260,
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 180,
      align: "center",
      title: "Package Name",
      dataIndex: "package_name",
      key: "package_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 100,
      align: "center",
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <p
          className={`font-medium text-sm leading-5 capitalize p-1 border-solid border rounded-md ${
            text === "pending"
              ? "text-yellow-500 bg-yellow-100 border-yellow-300"
              : text === "processing"
              ? "text-orange-500 bg-orange-100 border-orange-300"
              : text == "completed"
              ? "text-green-500 bg-green-100 border-green-300"
              : "text-red-500 bg-red-100 border-red-300"
          }`}
        >
          {text}
        </p>
      ),
    },
    {
      width: 180,
      align: "center",
      title: "Published",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("MMMM Do YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.createdAt) - Number(b.createdAt),
    },
    {
      width: 180,
      align: "center",
      title: "Last updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("MMMM Do YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.updateAt) - Number(b.updateAt),
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
            label: <MembershipCancellationStatusModal record={record} />,
          },
          //   {
          //     key: "2",
          //     label: <DeleteLanePopup id={record?._id} />,
          //   },
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

  const onSearch = (value: string) => {
    if (value.length < 1) {
      setSearch(undefined);
    } else {
      setSearch(value);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
          Membership Cancellation Info
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.count || 0} cancellation available
        </p>
      </div>
      <Input.Search
        onSearch={onSearch}
        placeholder="Search by user email"
        className="text-sm col-span-3 font-medium text-[#5D5D5D]"
      />
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

export default MembershipCancellation;
