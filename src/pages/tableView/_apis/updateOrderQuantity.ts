import { instance } from "@services/instance";

export type QuantityAction = "increase" | "decrease";

export const updateOrderQuantity = async (
  tableNum: number,
  orderId: number,
  action: QuantityAction
) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await instance.patch(
    `/api/manager/tables/${tableNum}/orders/${orderId}/`,
    { action },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
