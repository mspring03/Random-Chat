import React, { useState, useCallback, useReducer, useRef } from "react";
import { authImage } from "../../assets";
import { requestApi } from "../../APIrequest";
import * as S from "./style";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e) => {
    dispatch(e.target);
  };
  return [state, onChange];
}

const SigninContainer = () => {
  const [checkId, changeCheckId] = useState(false);
  const [checkNickname, changeCheckNickname] = useState(false);
  const [checkPw, changeCheckPw] = useState(false);

  const [state, onChange] = useInputs({
    id: "",
    password: "",
    checkPassword: "",
    nickname: "",
    description: "",
    tag: "",
  });
  const formRefs = {
    id: useRef(),
    password: useRef(),
    checkPassword: useRef(),
    nickname: useRef(),
  };

  const { id, password, checkPassword, nickname, description, tag } = state;

  const inputClickHandler = useCallback((e) => {
    e.target.classList.remove("problem");
    changeCheckId(false)
    changeCheckNickname(false)
  }, []);

  const inputPasswordClickHandler = useCallback((e) => {
    formRefs.password.current.classList.remove("problem");
    formRefs.checkPassword.current.classList.remove("problem");

    changeCheckPw(false)
  }, [password, checkPassword]);

  console.log(state);

  const signup = useCallback(async () => {
    if (!id.length) {
        formRefs.id.current.classList.add("problem");
        return; 
    }

    if (!password.length) {
        formRefs.password.current.classList.add("problem");
        return; 
    }

    if (!checkPassword.length) {
        console.log(1);
        formRefs.checkPassword.current.classList.add("problem");
        return;
    }

    if (!nickname.length) {
        formRefs.nickname.current.classList.add("problem")
        return;
    }

    if (password !== checkPassword) {
        changeCheckPw(true);
        formRefs.password.current.classList.add("problem");
        formRefs.checkPassword.current.classList.add("problem");

        return;
    }
    try {
      const res = await requestApi(
        "/signup/basic",
        {
          id: id,
          password: password,
          nickname: nickname,
          description: description,
          tag: tag,
        },
        {},
        "post"
      );
      if (res.status === 200) {
        console.log(res);
      } else console.log(res);

      alert('회원가입 성공');
    } catch (err) {
        console.log(err);
        if (err.data.message === "User already registered") {
            formRefs.id.current.classList.add("problem");
            changeCheckId(true);
        }

        if (err.data.message === "Nickname already in use") {
            formRefs.nickname.current.classList.add("problem");
            changeCheckNickname(true);
        }
    }
  }, [id, password, checkPassword, nickname, description, tag]);

  return (
    <S.Container>
      <S.AuthImage src={authImage} />
      <S.FormWrap>
        <S.FormHeader>회원가입</S.FormHeader>
        <S.FormWarnMessage message={checkId}>이미 있는 아이디</S.FormWarnMessage>
        <S.FormBody>
          <S.FormInput
            name="id"
            ref={formRefs.id}
            placeholder="아이디"
            onChange={onChange}
            onClick={inputClickHandler}
          ></S.FormInput>
          <S.FormInput
            name="password"
            ref={formRefs.password}
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            onClick={inputPasswordClickHandler}
          ></S.FormInput>
          <S.FormWarnMessage message={checkPw}>비밀번호가 일치하지 않습니다.</S.FormWarnMessage>
          <S.FormInput
            name="checkPassword"
            ref={formRefs.checkPassword}
            placeholder="비밀번호확인"
            type="password"
            onChange={onChange}
            onClick={inputPasswordClickHandler}
          ></S.FormInput>
          <S.FormWarnMessage message={checkNickname}>이미 있는 닉네임</S.FormWarnMessage>
          <S.FormInput
            name="nickname"
            ref={formRefs.nickname}
            placeholder="닉네임"
            onChange={onChange}
            onClick={inputClickHandler}
          ></S.FormInput>
          <S.FormInput
            name="description"
            placeholder="설명"
            onChange={onChange}
            onClick={inputClickHandler}
          ></S.FormInput>
          <S.FormInput
            name="tag"
            placeholder="테그"
            onChange={onChange}
            onClick={inputClickHandler}
          ></S.FormInput>
        </S.FormBody>
        <S.FormFooter>
          <S.FormButton
            backgroundColor="#4843C4"
            color="white"
            borderColor="#4843C4"
            onClick={signup}
          >
            회원가입
          </S.FormButton>
          <S.FormLink href="/login">로그인하기</S.FormLink>
        </S.FormFooter>
      </S.FormWrap>
    </S.Container>
  );
};

export default SigninContainer;
