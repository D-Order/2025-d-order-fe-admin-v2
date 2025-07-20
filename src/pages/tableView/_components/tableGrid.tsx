import { useState, useEffect } from "react";
import * as S from "./tableComponents.styled";
import { useSwipeable } from "react-swipeable";
import TableCard from "./tableCard";
import { TableItem } from "../_apis/getTableList";

interface Props {
  tableList: TableItem[];
  onSelectTable: (table: TableItem) => void;
}

interface TableOrder {
  tableNumber: number;
  totalAmount: number;
  orderedAt: string;
  orders: {
    menu: string;
    quantity: number;
  }[];
}

const mapToTableOrder = (item: TableItem): TableOrder => ({
  tableNumber: item.table_num,
  totalAmount: item.table_price,
  orderedAt: item.created_at
    ? new Date(item.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "주문 없음",
  orders: item.orders.map((order) => ({
    menu: order.menu_name,
    quantity: order.menu_num,
  })),
});

const TableViewGrid: React.FC<Props> = ({ tableList, onSelectTable }) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [columns, setColumns] = useState(5);

  const mappedData = tableList.map((item) => ({
    original: item,
    viewData: mapToTableOrder(item),
  }));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1366) {
        setItemsPerPage(28);
        setColumns(7);
      } else if (width >= 1180) {
        setItemsPerPage(18);
        setColumns(6);
      } else {
        setItemsPerPage(15);
        setColumns(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(mappedData.length / itemsPerPage);
  const currentItems = mappedData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <S.GridWrapper {...handlers}>
      <S.GridView $columns={columns}>
        {currentItems.map(({ original, viewData }) => (
          <div key={original.table_num} onClick={() => onSelectTable(original)}>
            <TableCard data={viewData} />
          </div>
          // <div key={table.table_num} onClick={() => onSelectTable(table)}>
          // <TableCard data={mapToTableOrder(table)} />
          // </div>
        ))}
      </S.GridView>

      <S.PageIndicatorWrapper>
        {Array.from({ length: totalPages }).map((_, index) => (
          <S.Dot key={index} $active={page === index} />
        ))}
      </S.PageIndicatorWrapper>
    </S.GridWrapper>
  );
};

export default TableViewGrid;
