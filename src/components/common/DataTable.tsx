/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table } from "antd";
import { memo, useRef } from "react";

type TProps = {
  columns: any;
  data: Array<any>;
  loading: boolean;
};

const DataTable = memo(({ columns, data, loading }: TProps) => {
  const tableRef = useRef<any>(null);
  const props: any = {
    title: undefined,
    bordered: true,
    loading: loading,
    showHeader: true,
    pagination: false,
    size: "middle",
  };
  return (
    <>
      <Table
        {...props}
        ref={tableRef}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={data}
        className="h-[calc(100vh-275px)] overflow-y-auto"
      />
    </>
  );
});

export default DataTable;
