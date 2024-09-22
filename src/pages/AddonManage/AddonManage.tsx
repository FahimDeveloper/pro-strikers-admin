/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Select } from "antd";
import DataPagination from "../../components/common/DataPagination";
import DataTable from "../../components/common/DataTable";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { IAddon } from "../../types/addon.types";
import { useAddonsQuery } from "../../redux/features/addon/addonApi";
import AddAddonModal from "../../components/ui/modal/AddAddonModal";
import UpdateAddonModal from "../../components/ui/modal/UpdateAddonModal";
import DeleteAddonPopup from "../../components/ui/popup/DeleteAddonPopup";

const AddonManage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [facility, setFacility] = useState<string | undefined>(undefined);
  const [sport, setSport] = useState<string | undefined>(undefined);
  const { data, isLoading, isFetching } = useAddonsQuery({
    page,
    limit,
    facility,
    sport,
  });
  const columns: ColumnsType<IAddon> = [
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
      title: "Sport",
      dataIndex: "sport",
      key: "sport",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      align: "center",
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
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
      sorter: (a, b) => Number(a.updatedAt) - Number(b.updatedAt),
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
            label: <UpdateAddonModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteAddonPopup id={record?._id} />,
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

  const onChange = (value: string, filter: string) => {
    if (filter === "sport") {
      if (value === "all") {
        setSport(undefined);
      } else {
        setSport(value);
      }
    } else if (filter === "facility") {
      if (value === "all") {
        setFacility(undefined);
      } else {
        setFacility(value);
      }
    }
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-5">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
              Addons
            </h2>
            <p className="text-[#838383] font-semibold text-lg">
              {data?.count || 0} addon available
            </p>
          </div>
          <AddAddonModal />
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            <Select
              className="w-40"
              showSearch
              defaultValue={"all"}
              optionFilterProp="children"
              onChange={(value) => onChange(value, "facility")}
              filterOption={filterOption}
              options={[
                {
                  label: "All Facility",
                  value: "all",
                },
                {
                  label: "Cricket Cage",
                  value: "cricket cage",
                },
                {
                  label: "Soccer Cage",
                  value: "soccer cage",
                },
                {
                  label: "Baseball Cage",
                  value: "baseball cage",
                },
                {
                  label: "Softball Cage",
                  value: "softball cage",
                },
                {
                  label: "Hockey Cage",
                  value: "hockey cage",
                },
              ]}
            />
            <Select
              className="w-40"
              showSearch
              defaultValue={"all"}
              optionFilterProp="children"
              onChange={(value) => onChange(value, "sport")}
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
                  label: "Hockey",
                  value: "hockey",
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
      </div>
      <DataPagination
        onChange={handlePageChange}
        page={page}
        limit={limit}
        total={data?.count || 0}
      />
    </div>
  );
};

export default AddonManage;
