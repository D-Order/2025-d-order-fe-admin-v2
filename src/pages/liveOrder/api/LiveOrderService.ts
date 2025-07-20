// src/pages/liveOrder/api/LiveOrderService.ts
import { AxiosResponse } from "axios";
import { instance } from "../../../services/instance";

// UI에서 사용할 주문 항목 인터페이스
export interface OrderItem {
  id?: number;
  time: string;
  table: string;
  menu: string;
  quantity: number;
  isServed: boolean;
  imageUrl?: string;
}

// API 응답 인터페이스
export interface Order {
  id: number;
  menu_name: string;
  menu_price: number;
  menu_num: number;
  order_status: string;
  created_at: string;
  table_num: number;
  menu_image?: string; // API에서 이미지 URL이 제공될 경우를 위한 필드
}

export interface OrderListResponse {
  status: string;
  message: string;
  code: number;
  data: {
    total_revenue: number;
    orders: Order[];
  };
}

export interface OrderUpdateResponse {
  status: string;
  message: string;
  code: number;
  data: {
    id: number;
    cart_id: number;
    menu_id: number;
    menu_name: string;
    menu_price: number;
    menu_num: number;
    order_status: string;
    created_at: string;
  };
}

class LiveOrderService {
  // 주문 목록 및 매출 정보 조회
  static async getOrders(): Promise<OrderListResponse> {
    try {
      const response: AxiosResponse<OrderListResponse> = await instance.get(
        "/api/booths/orders/"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // 주문 상태 업데이트 (서빙 완료로 변경)
  static async updateOrderStatus(
    orderId: number
  ): Promise<OrderUpdateResponse> {
    try {
      const response: AxiosResponse<OrderUpdateResponse> = await instance.patch(
        `/api/orders/${orderId}/`,
        {
          order_status: "served_complete",
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default LiveOrderService;
