import { useEffect, useState } from "react";
import { getTableDetail, TableDetailResponse } from "../_apis/getTableDetail";

export const useTableDetail = (tableNum: number) => {
  const [data, setData] = useState<TableDetailResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response = await getTableDetail(tableNum);
      setData(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [tableNum]);

  return {
    tableDetail: data,
    loading,
    error,
    refetch: fetchDetail,
  };
};
