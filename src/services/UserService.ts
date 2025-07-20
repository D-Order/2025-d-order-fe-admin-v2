import { instance } from "./instance";

export interface SignupRequest {
  username: string;
  password: string;
  booth_name: string;
  table_num: number;
  order_check_password: string;
  account: number;
  depositor: string;
  bank: string;
  seat_type: "PT" | "PP" | "NO";
  seat_tax_person: number;
  seat_tax_table: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  code: number;
  data: {
    manager_id: number;
    booth_id: number;
    access_token: string;
  };
}

const UserService = {
  postSignup: async (data: SignupRequest) => {
    const response = await instance.post("/api/manager/signup/", data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await instance.post("/api/manager/login/", data);

      if (!response.data?.data?.access_token) {
        throw new Error("로그인 응답이 올바르지 않습니다.");
      }

      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const statusText = error?.response?.statusText;

      const message =
        status && statusText
          ? `${status} ${statusText}`
          : "로그인 중 알 수 없는 오류가 발생했습니다.";

      throw new Error(message);
    }
  },
};

export default UserService;
