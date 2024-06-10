/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown } from "antd";
import DataPagination from "../../components/common/DataPagination";
import DataTable from "../../components/common/DataTable";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import UpdateLaneModal from "../../components/ui/modal/UpdateLaneModal";
import DeleteLanePopup from "../../components/ui/popup/DeleteLanePopup";
import AddLaneModal from "../../components/ui/modal/AddLaneModal";
import { useLanesQuery } from "../../redux/features/Lane/laneApi";

const LaneManage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useLanesQuery({
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
      align: "center",
      title: "Lane Title",
      dataIndex: "lane_title",
      key: "lane_title",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      align: "center",
      title: "Published",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.createdAt) - Number(b.createdAt),
    },
    {
      align: "center",
      title: "Last updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
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
            label: <UpdateLaneModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteLanePopup id={record?._id} />,
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

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Lane Information
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} Lane available
          </p>
        </div>
        <AddLaneModal />
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

export default LaneManage;
