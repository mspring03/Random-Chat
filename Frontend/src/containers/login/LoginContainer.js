import React, { useState, useCallback } from 'react';
import {authImage} from '../../assets';
import { requestApi } from '../../APIrequest'
import * as S from './style';

const LoginContainer = () => {
    const [id, changeId] = useState('');
	const [password, changePassword] = useState('');
    const [checkID, setChekID] = useState(false);

    const idOnChange = useCallback((e) => {
		changeId(e.target.value);
	});

	const passwordOnChange = useCallback((e) => {
		changePassword(e.target.value);
	}, []);

    const loginPress = useCallback((e)=>{
		if(e.keyCode === 13){
			login();
		}
    }, [id, password]);
    

    const login = useCallback(async () => {
        try {
            const res = await requestApi(
				'/signin/basic',
				{ id: id, password: password },
				{},
				'post',
			);
			if (res.status === 200) {   
                console.log(res);
			}
			else console.log(res);
        } catch (err) {
            setChekID(true);
        }
    }, [id, password])

    return (
        <S.Container>
            <S.AuthImage src={authImage} />
            <S.FormWrap>
                <S.FormHeader>로그인</S.FormHeader>
                <S.FormBody>
                    <S.FormInputId placeholder="아이디" type="id" onChange={idOnChange} />
                    <S.FormInputPassword placeholder="비밀번호" type="password" onChange={passwordOnChange} onKeyDown={loginPress} />
                    <S.FormMessage check={checkID} >입력하신 이메일 주소 또는 휴대폰 번호가 계정에 연결되지 않았습니다.</S.FormMessage>
                </S.FormBody>
                <S.FormFooter>
                <S.FormButton backgroundColor="#4843C4" color="white" borderColor="#4843C4" onClick={login}>로그인</S.FormButton>
                    <S.FormButton backgroundColor="white" color="#4843C4" borderColor="#4843C4">게스트 아이디로 로그인</S.FormButton>
                    <S.FormLink href="/signup">회원가입하기</S.FormLink>
                </S.FormFooter>
            </S.FormWrap>
        </S.Container>
    );
}

export default LoginContainer;