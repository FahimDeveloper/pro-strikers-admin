/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, Image, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import DataTable from "../../components/common/DataTable";
import DataPagination from "../../components/common/DataPagination";
import { useMembershipUsersQuery } from "../../redux/features/user/userApi";
import { IUser } from "../../types/user.type";
import moment from "moment";
import UpdateUserModal from "../../components/ui/modal/UpdateClientModal";
import { BsThreeDots } from "react-icons/bs";

const Membership = () => {
  const [membership, setMembership] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = useMembershipUsersQuery({
    search,
    package_name: membership,
    status: active,
    limit,
    page,
  });
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
      width: 300,
      align: "center",
      title: "Client Name",
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => (
        <div className="flex items-center justify-between ms-7 gap-5">
          <Image src={record?.image} style={{ width: 50 }} />
          <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
            {record?.first_name} {record?.last_name}
          </p>
        </div>
      ),
    },
    {
      width: 260,
      align: "center",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 220,
      align: "center",
      title: "Membership",
      dataIndex: "package_name",
      key: "package_name",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
      title: "Plan",
      align: "center",
      dataIndex: "plan",
      key: "plan",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
      sorter: (a: { plan: string }, b: { plan: string }) =>
        a.plan.localeCompare(b.plan),
    },
    {
      width: 160,
      align: "center",
      title: "Issue Date",
      dataIndex: "issue_date",
      key: "issue_date",
      render: (text) => (
        <>
          {text ? (
            <p className="font-medium text-sm leading-5 text-[#151515]">
              {moment(text).format("DD/MM/YYYY")}
            </p>
          ) : (
            <p className="font-medium text-sm leading-5 text-[#151515]">
              No Issue date
            </p>
          )}
        </>
      ),
    },
    {
      width: 160,
      align: "center",
      title: "Expiry Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      render: (text) => (
        <>
          {text ? (
            <p className="font-medium text-sm leading-5 text-[#151515]">
              {moment(text).format("DD/MM/YYYY")}
            </p>
          ) : (
            <p className="font-medium text-sm leading-5 text-[#151515]">
              No Expiry date
            </p>
          )}
        </>
      ),
    },
    {
      width: 120,
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
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
      sorter: (a: { status: boolean }, b: { status: boolean }) =>
        Number(a.status) - Number(b.status),
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
            label: <UpdateUserModal record={record} />,
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

  const onChange = (value: string, filter: string) => {
    if (filter === "membership") {
      if (value === "all") {
        setMembership(undefined);
      } else {
        setMembership(value);
      }
    } else if (filter === "activeStatus") {
      if (value === "active") {
        setActive(true);
      } else if (value == "in active") {
        setActive(false);
      } else if (value === "all") {
        setActive(undefined);
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
            Membership Clinets
          </h3>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} membership clients available
          </p>
        </div>
        <div className="grid grid-cols-9 gap-2 items-center">
          <Input.Search
            onSearch={onSearch}
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
                {
                  label: "Teams & Organizations",
                  value: "teams & organizations",
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
          loading={isLoading || isFetching}
        />
        <DataPagination
          onChange={handlePageChange}
          page={page}
          limit={limit}
          total={data?.count || 0}
        />
      </div>
    </div>
  );
};

export default Membership;
