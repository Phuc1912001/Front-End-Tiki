import { Table } from "antd";
import { useState } from "react";

const TableComponent = (props: any) => {
  const { data, isLoading, columns } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      loading={isLoading}
      dataSource={data}
    />
  );
};

export default TableComponent;
