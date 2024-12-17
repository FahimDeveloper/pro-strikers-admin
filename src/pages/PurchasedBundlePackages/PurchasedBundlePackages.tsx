import { useState } from "react";
import { useGetPurchasedBundlePackagesQuery } from "../../redux/features/purchasedBundlePackage/purchasedBundlePackageApi";
import { ColumnsType } from "antd/es/table";
import { IBundleCreditPackResponse } from "../../types/bundle-package.type";
import { Dropdown, Input, Select, Tooltip } from "antd";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import UpdatePurchasedBundleCreditPack from "../../components/ui/modal/UpdatePurchasedBundleCreditPack";

const PurchasedBundlePackages = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [machine, setMachine] = useState<boolean | undefined>(undefined);
  const [active, setActive] = useState<boolean | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useGetPurchasedBundlePackagesQuery({
    search,
    piching_machine: machine,
    active,
    page,
    limit,
  });
  const columns: ColumnsType<IBundleCreditPackResponse> = [
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
      title: "Package Name",
      dataIndex: "package",
      key: "package",
      render: (text) => (
        <Tooltip placement="top" title={text}>
          <p className="font-medium text-sm leading-5 text-[#151515] truncate">
            {text}
          </p>
        </Tooltip>
      ),
    },
    {
      width: 260,
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] truncate">
          {text}
        </p>
      ),
    },
    {
      width: 160,
      title: "Piching Machine",
      align: "center",
      dataIndex: "piching_machine",
      key: "piching_machine",
      render: (text) =>
        text ? (
          <p className="font-medium text-sm leading-5 text-[#151515] truncate">
            Yes
          </p>
        ) : (
          <p className="font-medium text-sm leading-5 text-[#151515] truncate">
            No
          </p>
        ),
      sorter: (
        a: { piching_machine: boolean },
        b: { piching_machine: boolean }
      ) => Number(a.piching_machine) - Number(b.piching_machine),
    },
    {
      width: 120,
      align: "center",
      title: "Credit Hours",
      dataIndex: "hours",
      key: "hours",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] truncate">
          {text}
        </p>
      ),
    },
    {
      width: 180,
      title: "Validaty duration",
      align: "center",
      dataIndex: "validaty",
      key: "validaty",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("ddd, MMM Do YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.validity) - Number(b.validity),
    },
    {
      width: 120,
      fixed: "right",
      title: "Activity",
      align: "center",
      dataIndex: "active",
      key: "active",
      render: (text) =>
        text ? (
          <div className="w-full rounded-sm text-[#0F3808] bg-[#CFFFC8] py-1">
            Active
          </div>
        ) : (
          <div className="w-full rounded-sm text-[#A71616] bg-[#FFC8C8] py-1">
            In Active
          </div>
        ),
      sorter: (a: { active: boolean }, b: { active: boolean }) =>
        Number(a.active) - Number(b.active),
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
            label: <UpdatePurchasedBundleCreditPack record={record} />,
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
    option?: { label: string; value: string | boolean }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value: string | boolean, filter: string) => {
    if (filter === "machine") {
      if (value === "all") {
        setMachine(undefined);
      } else {
        setMachine(value as boolean);
      }
    } else if (filter === "activeStatus") {
      if (value === "all") {
        setActive(undefined);
      } else {
        setActive(value as boolean);
      }
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
            Purchased Bundle Credit Pack
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} purchased credit pack
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          allowClear
          placeholder="Search by user email"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value, "machine")}
          filterOption={filterOption}
          options={[
            {
              label: "All Credit Pack",
              value: "all",
            },
            {
              label: "With piching machine",
              value: true,
            },
            {
              label: "With out piching machine",
              value: false,
            },
          ]}
        />
        <Select
          className="w-full"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value, "activeStatus")}
          filterOption={filterOption}
          options={[
            {
              label: "All Credit Pack",
              value: "all",
            },
            {
              label: "Active",
              value: true,
            },
            {
              label: "In Active",
              value: false,
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

export default PurchasedBundlePackages;
