/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Input, Select, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";
import { useOrdersQuery } from "../../redux/features/order/orderApi";
import DeleteOrderPopup from "../../components/ui/popup/DeleteOrderPopup";

const Orders = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useOrdersQuery({
    search,
    category,
    page,
    limit,
  });
  const { Paragraph } = Typography;
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
      width: 240,
      title: "Order ID",
      align: "center",
      dataIndex: "_id",
      key: "_id",
      render: (text) => (
        <Paragraph
          copyable={{
            text: async () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve(text);
                }, 500);
              }),
          }}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      width: 250,
      align: "center",
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 250,
      align: "center",
      title: "Product Name",
      dataIndex: "product",
      key: "product",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {text?.product_name}
        </p>
      ),
    },
    {
      width: 140,
      title: "Category",
      align: "center",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      width: 120,
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">${text}</p>
      ),
    },
    {
      width: 160,
      title: "Order Date",
      align: "center",
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
      width: 160,
      title: "Order Update",
      align: "center",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.createdAt) - Number(b.createdAt),
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
            label: <DeleteOrderPopup id={record?._id} />,
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
    if (value === "all") {
      setCategory(undefined);
    } else {
      setCategory(value);
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
        <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
          Orders
        </h2>
        <p className="text-[#838383] font-semibold text-lg">
          {data?.count || 0} orders available
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search by user email"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value)}
          filterOption={filterOption}
          options={[
            {
              label: "All Category",
              value: "all",
            },
            { value: "bats", label: "Bats" },
            { value: "gloves", label: "Gloves" },
            { value: "wearables", label: "Wearables" },
            { value: "soccer item", label: "Soccer Item" },
            { value: "helmet", label: "Helmet" },
            { value: "sports bags", label: "Sports Bags" },
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

export default Orders;
