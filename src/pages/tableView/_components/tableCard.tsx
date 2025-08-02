// 2025-d-order-fe-admin-v2/src/pages/tableView/_components/tableCard.tsx
import * as S from './tableComponents.styled';
import { TABLEPAGE_CONSTANTS } from '../_constants/tableConstants';

interface TableCardData {
    tableNumber: number;
    totalAmount: number;
    orderedAt: string;
    orders: {
        menu: string;
        quantity: number;
    }[];
}

interface Props {
    data: TableCardData;
}

const TableCard: React.FC<Props> = ({ data }) => {
    return (
        <S.CardWrapper>
        <S.TableInfo>
            <p className="tableNumber">테이블 {data.tableNumber}</p>
            <p className="orderTime">{data.orderedAt}</p>
        </S.TableInfo>

        <S.DivideLine />

        <S.MenuList>
            {data.orders.slice(0, 3).map((order, idx) => (
                <>
                <div key={idx}>
                <S.MenuItem>
                <p className="menuName">{order.menu}</p>
                <p className="menuAmount">{order.quantity}</p>
                </S.MenuItem>
                {/* <img
                src={TABLEPAGE_CONSTANTS.TABLE.IMAGE.MENU_LINE}
                alt="구분선"
                /> */}
            </div>
            <img
                src={TABLEPAGE_CONSTANTS.TABLE.IMAGE.MENU_LINE}
                alt="구분선"
                />
                </>
            
            ))}
            <S.ToDetail>더보기</S.ToDetail>
        </S.MenuList>

        <S.TotalPrice>
            <p className="totalPrice">
            총 금액 {data.totalAmount.toLocaleString()}원
            </p>
        </S.TotalPrice>
        </S.CardWrapper>
    );
};

export default TableCard;
