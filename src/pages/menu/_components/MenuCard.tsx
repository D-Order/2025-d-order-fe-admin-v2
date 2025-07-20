import * as S from "./MenuCard.styled";
import { IMAGE_CONSTANTS } from "@constants/imageConstants";
import { useState } from "react";
import MenuModal from "../../modal_test_view/_components/MenuModal";
import MenuDeleteModal from "../../modal_test_view/_components/MenuDeleteModal";
import { Menu } from "../api/MenuService";
import MenuService from "../api/MenuService";

interface MenuCardProps {
  menu: Menu;
  onMenuChange: () => void;
}

const MenuCard = ({ menu, onMenuChange }: MenuCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isSoldOut = menu.menu_remain !== undefined && menu.menu_remain <= 0;

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await MenuService.deleteMenu(menu.id);
      setShowDeleteModal(false);
      onMenuChange(); // 목록 새로고침
    } catch (error) {
      alert("메뉴 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <S.MenuCardWrapper>
        {isSoldOut && (
          <S.SoldOutOverlay>
            <S.SoldOutText>SOLD OUT</S.SoldOutText>
          </S.SoldOutOverlay>
        )}
        <S.CardContents>
          <S.CardImg>
            {menu.menu_image ? (
              <img src={menu.menu_image} alt={menu.menu_name} />
            ) : (
              <S.DefaultCardImg>
                <img src={IMAGE_CONSTANTS.CHARACTER} alt={menu.menu_name} />
              </S.DefaultCardImg>
            )}
            <S.DeleteBtn onClick={handleDeleteClick}>
              <img src={IMAGE_CONSTANTS.VECTOR} alt="삭제" />
            </S.DeleteBtn>
          </S.CardImg>
          <S.CardInfo>
            <S.MenuEditBtn onClick={handleEditClick}>
              <img src={IMAGE_CONSTANTS.MENUEDIT} alt="수정아이콘" />
              메뉴 수정
            </S.MenuEditBtn>
            <S.CardTextInner>
              <S.CardText className="bold">{menu.menu_name}</S.CardText>
              <S.CardText>{menu.menu_price.toLocaleString()}원</S.CardText>
            </S.CardTextInner>
            <S.CardTextInner>
              <S.CardText>재고수량</S.CardText>
              <S.CardText>
                {menu.menu_remain !== undefined ? `${menu.menu_remain}개` : "-"}
              </S.CardText>
            </S.CardTextInner>
          </S.CardInfo>
        </S.CardContents>
      </S.MenuCardWrapper>

      {showModal && (
        <S.ModalWrapper onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <MenuModal
              handleCloseModal={handleCloseModal}
              text="메뉴 수정"
              isEdit={true}
              onSuccess={onMenuChange}
              defaultValues={{
                menu_id: menu.id,
                menu_name: menu.menu_name,
                menu_description: menu.menu_description,
                menu_category: menu.menu_category,
                menu_price: menu.menu_price,
                menu_amount: menu.menu_remain,
                menu_image: menu.menu_image,
              }}
            />
          </div>
        </S.ModalWrapper>
      )}

      {showDeleteModal && (
        <MenuDeleteModal
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default MenuCard;
