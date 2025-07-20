import { useEffect, useState } from "react";
import { getTableList, TableItem } from "../_apis/getTableList";

export const useTableList = () => {
    const [tableList, setTableList] = useState<TableItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTableList = async () => {
        try {
        setLoading(true);
        const response = await getTableList();
        setTableList(response.data);
        } catch (err: any) {
        setError(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableList();
    }, []);

    return {
        tableList,
        loading,
        error,
        refetch: fetchTableList,
    };
};
