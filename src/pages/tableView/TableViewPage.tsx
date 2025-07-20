import { useState } from "react";
import TableViewGrid from "./_components/tableGrid";
import TableDetail from "./_components/detailPage/tableDetail";
import * as S from "./TableViewPage.styled";
import { TableItem } from "./_apis/getTableList";
import { TableDetailData, getTableDetail } from "./_apis/getTableDetail";
import { useTableList } from "./_hooks/useTableList";
import { LoadingSpinner } from "./_apis/loadingSpinner";

const TableViewPage = () => {
    const [selectedTableDetail, setSelectedTableDetail] =
        useState<TableDetailData | null>(null);
    const { tableList, loading, error, refetch } = useTableList();

    const handleSelectTable = async (table: TableItem) => {
        try {
        const detail = await getTableDetail(table.table_num);
        setSelectedTableDetail(detail.data);
        } catch (err) {}
    };

    const handleBackFromDetail = () => {
        setSelectedTableDetail(null);
        refetch();
    };

    if (loading) return <LoadingSpinner />; // ✅ 교체
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <S.PageWrapper>
        {selectedTableDetail ? (
            <TableDetail data={selectedTableDetail} onBack={handleBackFromDetail} />
        ) : (
            <TableViewGrid
            tableList={tableList}
            onSelectTable={handleSelectTable}
            />
        )}
        </S.PageWrapper>
    );
};

export default TableViewPage;
