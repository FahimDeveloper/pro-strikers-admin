/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddPostModal from "../../components/ui/modal/AddPostModal";
import { usePostsQuery } from "../../redux/features/post/postApi";
import { IPost } from "../../types/post.type";
import UpdatePostModal from "../../components/ui/modal/UpdatePostModal";
import DeletePostPopup from "../../components/ui/popup/DeletePostPopup";
import { BsThreeDots } from "react-icons/bs";
import moment from "moment";

const Post = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading } = usePostsQuery({
    search,
    category,
    page,
    limit,
  });
  const columns: ColumnsType<IPost> = [
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
      title: "Thumbnail",
      align: "center",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} style={{ width: 50 }} />,
    },
    {
      title: "Post Title",
      align: "center",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Category",
      align: "center",
      dataIndex: "category",
      key: "category",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      title: "Publish Date",
      align: "center",
      dataIndex: "createdAt",
      key: "created_at",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
      sorter: (a, b) => Number(a.createdAt) - Number(b.createdAt),
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
            label: <UpdatePostModal record={record} />,
          },
          {
            key: "2",
            label: <DeletePostPopup id={record?._id} />,
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
            Posts
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} posts available
          </p>
        </div>
        <AddPostModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search by post name"
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
              label: "Field Hockey",
              value: "field hockey",
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

export default Post;
