import { useState } from "react";
import { useBrandsQuery } from "../../../redux/features/brand/brandApi";
import AddBrandModal from "../../../components/ui/modal/AddBrandModal";
import { Dropdown, Image, Input, Select } from "antd";
import DataTable from "../../../components/common/DataTable";
import DataPagination from "../../../components/common/DataPagination";
import { IBrand } from "../../../types/brand.types";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import UpdateBrandModal from "../../../components/ui/modal/UpdateBrandModal";
import DeleteBrandPopup from "../../../components/ui/popup/DeleteBrandPopup";
import { BsThreeDots } from "react-icons/bs";

const Brands = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useBrandsQuery({
    search,
    category,
    page,
    limit,
  });

  const columns: ColumnsType<IBrand> = [
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
      width: 100,
      align: "center",
      title: "Brand Logo",
      dataIndex: "brand_logo",
      key: "brand_logo",
      render: (text) => <Image src={text} width={60} height={60} />,
    },
    {
      width: 180,
      align: "center",
      title: "Brand Name",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
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
      width: 120,
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
            label: <UpdateBrandModal record={record} />,
          },
          {
            key: "2",
            label: <DeleteBrandPopup id={record?._id} />,
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
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Brands
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} brands available
          </p>
        </div>
        <AddBrandModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          allowClear
          placeholder="Search by brand name"
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

export default Brands;
