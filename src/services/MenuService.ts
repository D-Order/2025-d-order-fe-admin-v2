import { instatnceWithImg } from "./instance";

export interface MenuRegistResponse {
  status: string;
  message: string;
  code: number;
  data: {
    booth_id: number;
    menu_name: string;
    menu_category: string;
    menu_price: number;
    menu_amount: number;
    menu_remain: number;
    menu_image: string;
  } | null;
}
const MenuService = {
  postMenu: async (formData: FormData): Promise<MenuRegistResponse> => {
    try {
      const response = await instatnceWithImg.post<MenuRegistResponse>(
        "/api/manager/menu/add/",
        formData
      );
      return response.data;
    } catch (error) {
      return {
        status: "error",
        message: "메뉴 등록에 실패했습니다.",
        code: 500,
        data: null,
      };
    }
  },
  editMenu: async (
    formData: FormData,
    menu_id: number
  ): Promise<MenuRegistResponse> => {
    try {
      const response = await instatnceWithImg.patch<MenuRegistResponse>(
        `/api/manager/menu/${menu_id}/`,
        formData
      );
      return response.data;
    } catch (error) {
      return {
        status: "error",
        message: "메뉴 수정에 실패했습니다.",
        code: 500,
        data: null,
      };
    }
  },
};

export default MenuService;
