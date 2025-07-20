import { instance } from "@services/instance";

export const resetTable = async (tableNum: number) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const url = `/api/manager/tables/${tableNum}/reset/`;

  try {
    const response = await instance.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};
