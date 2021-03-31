import React, { useCallback, useState } from "react";
import roomAddImage from "../../../assets/roomAddImage.svg";
import * as S from "./style";
import Modal from "../Modal/Modal";

const Room = (props) => {
  const { roomList, setViewList, viewList, enterRoom } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const onChangeFormInput = (e) => {
    setInput(e.target.value);
  }   

  const loginPress = useCallback((e)=>{
    if(e.keyCode === 13){
        closeModal()
        plusButtonOnClick()
    }
  }, [input]);

  const plusButtonOnClick = useCallback(() => {
        setViewList(
            [
                viewList,
                <S.FormBoxFrame key={input} onClick={enterRoom} >
                    <S.Formname>{input}</S.Formname>
                    <S.Formpeople>0명 접속중</S.Formpeople>
                </S.FormBoxFrame>
            ]
        );
    })
  
  return (
    <S.FormWrap>
      {roomList}
      <S.Formbutton onClick={openModal}>
        <S.Formimage src={roomAddImage} />

        {
        modalVisible && <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}>
                방 이름을 입력해주세요
                <S.FormInput onChange={onChangeFormInput} onKeyDown={loginPress}/>
            </Modal>
        }
      </S.Formbutton>
    </S.FormWrap>
  );
};

export default Room;
