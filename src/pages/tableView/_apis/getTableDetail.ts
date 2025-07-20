import { instance } from "@services/instance";

export interface OrderDetail {
  id: number;
  menu_name: string;
  menu_price: number;
  menu_num: number;
  menu_image: string; // ✅ 추가됨 (명세에 있음)
  order_status: string;
}

export interface TableDetailData {
  table_num: number;
  table_price: number;
  table_status: string; // ✅ 추가됨
  created_at: string;
  orders: OrderDetail[];
}

export interface TableDetailResponse {
  status: string;
  message: string;
  code: number;
  data: TableDetailData;
}

export const getTableDetail = async (
  tableNum: number
): Promise<TableDetailResponse> => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await instance.get<TableDetailResponse>(
    `/api/manager/tables/${tableNum}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
