import React, { useState, useCallback, useRef } from "react";
import { authImage } from "../../../assets";
import { requestApi } from "../../../APIrequest";
import * as S from "./style";
import { useHistory } from "react-router-dom";

const GuestLogin = () => {
  const [nickname, changeNickname] = useState("");
  const [checkNickname, setCheckNickname] = useState(false);

  const history = useHistory();

  const formRefs = {
    nickname: useRef(),
  };

  const onChange = useCallback((e) => {
    changeNickname(e.target.value);
  });

  const inputClickHandler = useCallback((e) => {
    e.target.classList.remove("problem");

    setCheckNickname(false);
  }, []);

  const login = useCallback(async () => {
    console.log(nickname.length);
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
      if (res.status === 200) {
        console.log(res);
      } else console.log(res);

      alert("로그인");
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
