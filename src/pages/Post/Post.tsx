/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import AddPostModal from "../../components/ui/modal/AddPostModal";

const Post = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        thumbnail: "https://avatar.iran.liara.run/public/boy",
        post_name: "Demo post name",
        post_category: "cricket",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vero?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos similique tempore distinctio doloremque praesentium voluptatum expedita. Tempore sed quod beatae.",
        created_at: "02/12-2024",
      },
      {
        _id: "124",
        thumbnail: "https://avatar.iran.liara.run/public/boy",
        post_name: "Demo post name",
        post_category: "soccer",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vero?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos similique tempore distinctio doloremque praesentium voluptatum expedita. Tempore sed quod beatae.",
        created_at: "02/12-2024",
      },
      {
        _id: "125",
        thumbnail: "https://avatar.iran.liara.run/public/boy",
        post_name: "Demo post name",
        post_category: "softball",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, vero?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos similique tempore distinctio doloremque praesentium voluptatum expedita. Tempore sed quod beatae.",
        created_at: "02/12-2024",
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
      title: "Thumbnail",
      align: "center",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => <Image src={text} style={{ width: 40 }} />,
    },
    {
      title: "Post Name",
      align: "center",
      dataIndex: "post_name",
      key: "post_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.post_name.localeCompare(b.post_name),
    },
    {
      title: "Category",
      align: "center",
      dataIndex: "post_category",
      key: "post_category",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Publish Date",
      align: "center",
      dataIndex: "created_at",
      key: "created_at",
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

  const onChange = (value: string) => {
    if (value === "all") {
      setCategory(undefined);
    } else {
      setCategory(value);
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
              label: "Hockey",
              value: "hockey",
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

export default Post;
