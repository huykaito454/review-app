import { useState } from "react";
import { Table } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";
const TableAdmin = (props: any) => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>("small");
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<DataType> | undefined
  >({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState<TablePaginationPosition | "none">("none");
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();
  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = props.columns.map((item: any) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    showHeader,
    rowSelection,
    scroll,
    tableLayout,
  };
  return (
    <Table
      className="w-full"
      {...tableProps}
      pagination={{ position: [top as TablePaginationPosition, bottom] }}
      columns={tableColumns}
      rowKey="id"
      showSorterTooltip={false}
      dataSource={hasData ? props.data : []}
      scroll={scroll}
    />
  );
};

export default TableAdmin;
