import { Table } from "antd";

const TableComponent = (props: any) => {
  const { data, isLoading, columns } = props;

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={data}
      {...props}
      scroll={{ x: "max-content" }}
    />
  );
};

export default TableComponent;
