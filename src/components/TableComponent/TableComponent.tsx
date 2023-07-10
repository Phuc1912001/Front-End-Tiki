import { Table } from "antd";

const TableComponent = (props: any) => {
  const { data, isLoading, columns, rowSelection } = props;

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      loading={isLoading}
      dataSource={data}
      {...props}
    />
  );
};

export default TableComponent;
