import { instance } from "@services/instance";

export interface OrderItem {
    menu_name: string;
    menu_price: number;
    menu_num: number;
}

export interface TableItem {
    table_num: number;
    table_price: number;
    created_at: string | null;
    orders: {
        id: number;
        menu_name: string;
        menu_price: number;
        menu_num: number;
        order_status: string;
    }[];
    is_overdue: boolean; // ✅ 추가

}

export interface TableListResponse {
    status: string;
    message: string;
    code: number;
    data: TableItem[];
}

export const getTableList = async (): Promise<TableListResponse> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    const response = await instance.get<TableListResponse>(
        "/api/manager/tables/",
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    return response.data;
};
