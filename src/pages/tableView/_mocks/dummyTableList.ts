// tableView/_mocks/dummyTableList.ts
import { TableItem } from "../_apis/getTableList";

export const dummyTableList: TableItem[] = Array.from(
    { length: 26 },
    (_, i) => {
        const tableNum = i + 1;
        return {
            table_num: tableNum,
            table_price: 15000 + tableNum * 500, // 예시 가격
            created_at: `2025-08-02T12:${(tableNum * 5)
                .toString()
                .padStart(2, "0")}:00`,
            orders: [
                {
                    id: tableNum * 10 + 1,
                    menu_name: "김치찌개",
                    menu_price: 7000,
                    menu_num: 1,
                    order_status: "cooked",
                },
                {
                    id: tableNum * 10 + 2,
                    menu_name: "제육볶음",
                    menu_price: 8000,
                    menu_num: 1,
                    order_status: "cooking",
                },
            ],
        };
    }
);
