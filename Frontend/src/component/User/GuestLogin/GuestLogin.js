import React, { useState, useCallback, useRef, useEffect } from "react";
import { authImage } from "../../../assets";
import { requestApi } from "../../../APIrequest";
import * as S from "./style";
import { useHistory } from "react-router-dom";
import chatSocket from '../../../lib/socket'

const socket = chatSocket.getSocket();

const GuestLogin = () => {
  const [nickname, changeNickname] = useState("");
  const [checkNickname, setCheckNickname] = useState(false);

  const history = useHistory();

  const formRefs = {
    nickname: useRef(),
  };

  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('nickname');
    localStorage.removeItem('guest'); 
    localStorage.removeItem("reloadingRoomListPage");
    localStorage.removeItem("reloadingLoadingPage");
    localStorage.removeItem("reloadingChatingPage");
  }, [])

  const onChange = useCallback((e) => {
    changeNickname(e.target.value);
  }, []);

  const inputClickHandler = useCallback((e) => {
    e.target.classList.remove("problem");

    setCheckNickname(false);
  }, []);

  const login = useCallback(async () => {
    if (!nickname.length) {
      formRefs.nickname.current.classList.add("problem");
      return;
    }
    try {
      const res = await requestApi(
        "/guest/basic",
        {
          nickname: nickname,
        },
        {},
        "post"
      );
      console.log(res);
      localStorage.setItem(
        "access_token",
        `Bearer ${res.data.data.tokens.accessToken}`
      );
      localStorage.setItem("user_id", res.data.data.user.id);
      localStorage.setItem("nickname", res.data.data.user.nickname);
      localStorage.setItem("guest", res.data.data.user.guest);

      socket.emit("online", localStorage.getItem("user_id"));   

      history.push("/main");
    } catch (err) {
      console.log(err);

      if (err.data.message === "Nickname already in use") {
        setCheckNickname(true);
        formRefs.nickname.current.classList.add("problem");
      }
    }
  }, [nickname]);

  return (
    <S.Container>
      <S.AuthImage src={authImage} />
      <S.FormWrap>
        <S.FormHeader>게스트 로그인</S.FormHeader>
        <S.FormBody>
          <S.FormWarnMessage message={checkNickname}>
            이미 있는 닉네임
          </S.FormWarnMessage>
          <S.FormInput
            ref={formRefs.nickname}
            placeholder="닉네임"
            type="id"
            onChange={onChange}
            onClick={inputClickHandler}
          />
        </S.FormBody>
        <S.FormFooter>
          <S.FormButton
            backgroundColor="#4843C4"
            color="white"
            borderColor="#4843C4"
            onClick={login}
          >
            로그인
          </S.FormButton>
          <S.FormButton
            backgroundColor="white"
            color="#4843C4"
            borderColor="#4843C4"
            onClick={() => history.push("/login")}
          >
            돌아가기
          </S.FormButton>
          <S.FormLink onClick={() => history.push("/signup")}>
            회원가입하기
          </S.FormLink>
        </S.FormFooter>
      </S.FormWrap>
    </S.Container>
  );
};

export default GuestLogin;
