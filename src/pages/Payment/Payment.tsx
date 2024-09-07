import { useState } from "react";
import DataPagination from "../../components/common/DataPagination";
import DataTable from "../../components/common/DataTable";
import { usePaymentsQuery } from "../../redux/features/payment/paymentApi";
import { ColumnsType } from "antd/es/table";
import { IPayment } from "../../types/payment";
import moment from "moment";
import { Dropdown, Input, Select } from "antd";
import { BsThreeDots } from "react-icons/bs";
import AddPaymentModal from "../../components/ui/modal/AddPaymentModal";
import UpdatePaymentModal from "../../components/ui/modal/UpdatePaymentModal";
import DeletePaymentPopup from "../../components/ui/popup/DeletePaymentPopup";
import Paragraph from "antd/es/typography/Paragraph";

const Payment = () => {
  const [service, setService] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const { data, isLoading, isFetching } = usePaymentsQuery({
    search,
    service: service,
    page,
    limit,
  });
  const columns: ColumnsType<IPayment> = [
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
      width: 260,
      align: "center",
      title: "Transection ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
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
          <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
            {text}
          </p>
        </Paragraph>
      ),
    },
    {
      width: 260,
      align: "center",
      title: "User Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 120,
      align: "center",
      title: "Pay",
      dataIndex: "amount",
      key: "amount",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">{text}</p>
      ),
    },
    {
      width: 140,
      align: "center",
      title: "Payment Service",
      dataIndex: "service",
      key: "service",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515] capitalize">
          {text}
        </p>
      ),
    },
    {
      width: 160,
      align: "center",
      title: "Payment Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p className="font-medium text-sm leading-5 text-[#151515]">
          {moment(text).format("DD/MM/YYYY")}
        </p>
      ),
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
            label: <UpdatePaymentModal record={record} />,
          },
          {
            key: "2",
            label: <DeletePaymentPopup id={record?._id} />,
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
    if (value == "all") {
      setService(undefined);
    } else {
      setService(value);
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
            Payments
          </h2>
          <p className="text-[#838383] font-semibold text-lg">
            {data?.count || 0} available
          </p>
        </div>
        <AddPaymentModal />
      </div>
      <div className="grid grid-cols-4 gap-2 items-center">
        <Input.Search
          onSearch={onSearch}
          placeholder="Search voucher"
          className="text-sm col-span-3 font-medium text-[#5D5D5D]"
        />
        <Select
          className="w-full col-span-1"
          showSearch
          defaultValue={"all"}
          optionFilterProp="children"
          onChange={(value) => onChange(value)}
          filterOption={filterOption}
          options={[
            {
              label: "All Service",
              value: "all",
            },
            {
              label: "Membership",
              value: "membership",
            },
            {
              label: "Appointment",
              value: "appointment",
            },
            {
              label: "Facility",
              value: "facility",
            },
            {
              label: "Class",
              value: "class",
            },
            {
              label: "Bootcamp",
              value: "course",
            },
            {
              label: "Event",
              value: "event",
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

export default Payment;
