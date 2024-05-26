/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";

const Membership = () => {
  const [membership, setMembership] = useState<string | null>(null);
  const [active, setActive] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const plansData = [
    {
      _id: "123",
      name: "Individual Pro",
      member: 1546,
    },
    {
      _id: "124",
      name: "Individual Pro Unlimited",
      member: 1546,
    },
    {
      _id: "125",
      name: "Teams & Organizations",
      member: 1546,
    },
  ];
  const data = {
    count: 90,
    results: [
      {
        _id: "123",
        full_name: "Hasan Basan",
        email: "info@gmail.com",
        phone: "01916160514",
        active: true,
        membership: "Individual Pro",
        plan: "yearly",
        expiry_date: "02-05-2026",
      },
      {
        _id: "124",
        full_name: "Fahim",
        email: "info@gmail.com",
        phone: "01916160514",
        active: false,
        membership: "Individual Pro",
        plan: "monthly",
        expiry_date: "02-05-2023",
      },
      {
        _id: "125",
        full_name: "Fuyad",
        email: "info@gmail.com",
        phone: "01916160514",
        active: true,
        membership: "Individual Pro",
        plan: "yearly",
        expiry_date: "02-05--2025",
      },
    ],
  };
  const columns: ColumnsType<any> = [
    {
      width: 70,
      title: "S/N",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => {
        return <>{page * pageSize + index + 1 - pageSize}</>;
      },
    },
    {
      title: "Client Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Membership",
      dataIndex: "membership",
      key: "membership",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a: { plan: string }, b: { plan: string }) =>
        a.plan.localeCompare(b.plan),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
      sorter: (a: { expiry_date: string }, b: { expiry_date: string }) =>
        a.expiry_date.localeCompare(b.expiry_date),
    },
    {
      title: "Status",
      dataIndex: "active",
      align: "center",
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
      fixed: "right",
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
    setPageSize(size);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value: string, filter: string) => {
    if (filter === "membership") {
      setMembership(value);
    } else if (filter === "activeStatus") {
      if (value === "active") {
        setActive(true);
      } else if (value == "in active") {
        setActive(false);
      } else {
        setActive(null);
      }
    }
  };

  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="font-bold text-[28px] leading-9 text-[#111827]">
            Plans
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            3 membership plan available
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {plansData?.map((plan) => (
            <div className="bg-[#F5FFFF] border border-solid rounded-md border-[#BDFCFF] h-40 text-center flex flex-col justify-center">
              <h4 className="text-2xl text-[#06494D] font-bold">{plan.name}</h4>
              <div>
                <span className="text-[#244747] text-lg font-bold">
                  {plan.member}
                </span>{" "}
                <span className="text-sm text-[#84BEBE] font-semibold">
                  Active Members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-1">
          <h3 className="font-bold text-[28px] leading-9 text-[#111827]">
            Membership
          </h3>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} membership available
          </p>
        </div>
        <div className="grid grid-cols-9 gap-2 items-center">
          <Input.Search
            placeholder="Search by name or email"
            className="text-sm col-span-6 font-medium text-[#5D5D5D]"
          />
          <div className="flex col-span-3 gap-2 w-full">
            <Select
              className="w-full"
              showSearch
              defaultValue={"all"}
              optionFilterProp="children"
              onChange={(value) => onChange(value, "membership")}
              filterOption={filterOption}
              options={[
                {
                  label: "All Membership",
                  value: "all",
                },
                {
                  label: "Individual Pro",
                  value: "individual pro",
                },
                {
                  label: "Individual Pro Unlimited",
                  value: "individual pro unlimited",
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
                  label: "All Status",
                  value: "all",
                },
                {
                  label: "Active",
                  value: "active",
                },
                {
                  label: "In Active",
                  value: "in active",
                },
              ]}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data?.results || []}
          loading={false}
        />
        <DataPagination
          onChange={handlePageChange}
          page={page}
          pageSize={pageSize}
          total={data?.count || 0}
        />
      </div>
    </div>
  );
};

export default Membership;
