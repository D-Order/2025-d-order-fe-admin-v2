import * as S from './tableDetail.styled';
import ACCO from '@assets/images/character.svg';
import { IMAGE_CONSTANTS } from '@constants/imageConstants';
import CancelMenuModal from '../../_modal/CancelMenuModal';
import CancelConfirmModal from '../../_modal/CancelConfirmModal';
import ResetModal from '../../_modal/ResetModal';
import EmptyOrder from './emptyOrder';
import { updateOrderQuantity } from '../../_apis/updateOrderQuantity';
import { getTableDetail, TableDetailData } from '../../_apis/getTableDetail';
import { resetTable as resetTableAPI } from '../../_apis/resetTable';
import { useState } from 'react';

interface Props {
    data: TableDetailData;
    onBack?: () => void;
}

const TableDetail: React.FC<Props> = ({ data, onBack }) => {
    const [selectedMenu, setSelectedMenu] = useState<{ name: string; quantity: number } | null>(null);
    const [confirmInfo, setConfirmInfo] = useState<{ name: string; quantity: number } | null>(null);
    const [showResetModal, setShowResetModal] = useState(false);
    const [tableDetailData, setTableDetailData] = useState<TableDetailData>(data);

    const refetchTableDetail = async () => {
        try {
        const response = await getTableDetail(data.table_num);
        setTableDetailData(response.data);
        } catch (err) {
        
        }
    };

    return (
        <>
        <S.DetailWrapper>
            <S.DetailHeader>
            <S.TextWrapper>
                <S.BackButton onClick={onBack}>
                <img src={IMAGE_CONSTANTS.BACKWARD_BLACK} alt="뒤로가기버튼" />
                </S.BackButton>
                <p className="tableNumber">테이블 {tableDetailData.table_num} |</p>
                <p>상세 주문 내역</p>
            </S.TextWrapper>

            <S.TableReset onClick={() => setShowResetModal(true)}>
                <img src={IMAGE_CONSTANTS.RELOADWHITE} alt="초기화 버튼" />
                테이블 초기화
            </S.TableReset>
            </S.DetailHeader>

            <S.DivideLine />

            <S.TotalPrice>
            <p>💸총 주문금액</p>
            <p className="total">{tableDetailData.table_price.toLocaleString()}원</p>
            </S.TotalPrice>

            <S.MenuList>
            {tableDetailData.orders.length === 0 ? (
                <EmptyOrder />
            ) : (
                tableDetailData.orders.map((order) => (
                    <>
                    <div key={order.id}>
                    <S.ItemWrapper>
                    <S.ContentContainer>
                        <S.ImageWrapper>
                            <img
                            src={order.menu_image || ACCO}
                            alt={order.menu_name}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = ACCO;
                            }}
                            />
                        </S.ImageWrapper>
                        <S.TitleWrapper>
                        <p className="menuName">{order.menu_name}</p>
                        <S.GrayText>
                            <p>수량 : {order.menu_num}</p>
                            <p>가격 : {order.menu_price.toLocaleString()}원</p>
                        </S.GrayText>
                        </S.TitleWrapper>
                    </S.ContentContainer>
                    <S.ButtonWrapper>
                        <S.CancleButton
                        onClick={() =>
                            setSelectedMenu({ name: order.menu_name, quantity: order.menu_num })
                        }
                        >
                            <img src={IMAGE_CONSTANTS.Delete} alt="삭제" />
                            주문 취소
                        </S.CancleButton>
                    </S.ButtonWrapper>
                    </S.ItemWrapper>
                    
                </div>
                <S.DivideLine />
                    </>
                
                ))
            )}
            </S.MenuList>
        </S.DetailWrapper>

        {/* 수량 선택 모달 */}
        {selectedMenu && (
            <CancelMenuModal
            menuName={selectedMenu.name}
            initialQuantity={selectedMenu.quantity}
            onClose={() => setSelectedMenu(null)}
            onConfirmRequest={(q) => {
                setSelectedMenu(null);
                setConfirmInfo({ name: selectedMenu.name, quantity: q });
            }}
            />
        )}

        {/* 확인 모달 */}
        {confirmInfo && (
            <CancelConfirmModal
            onConfirm={async () => {
                try {
                const tableNumber = tableDetailData.table_num;
                const order = tableDetailData.orders.find(o => o.menu_name === confirmInfo.name);
                if (!order) {
                    alert("해당 주문을 찾을 수 없습니다.");
                    return;
                }

                const orderId = order.id;
                for (let i = 0; i < confirmInfo.quantity; i++) {
                    await updateOrderQuantity(tableNumber, orderId, "decrease");
                }

                setConfirmInfo(null);
                await refetchTableDetail();
                } catch (error: any) {
                setConfirmInfo(null);
                }
            }}
            onCancel={() => setConfirmInfo(null)}
            />
        )}

        {/* 초기화 모달 */}
        {showResetModal && (
            <ResetModal
            resetTable={async () => {
                try {
                await resetTableAPI(tableDetailData.table_num);
                setShowResetModal(false);
                await refetchTableDetail();
                } catch (err: any) {
                
                setShowResetModal(false);
                }
            }}
            onCancel={() => setShowResetModal(false)}
            />
        )}
        </>
    );
};

export default TableDetail;
