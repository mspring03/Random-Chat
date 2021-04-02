import React, { useState, useCallback, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {authImage} from '../../../assets';
import { requestApi } from '../../../APIrequest'
import * as S from './style';
import { useHistory } from 'react-router-dom';
import * as io from "socket.io-client";
import chatSocket from '../../../lib/socket'

const socket = chatSocket.getSocket();

const Login = () => {
    const [id, changeId] = useState('');
	const [password, changePassword] = useState('');
    const [checkID, setChekID] = useState(false);
    const history = useHistory();
    // const [socket, setSocket] = useState({})

    // const socketOn = useCallback((e) => {
    //     console.log(123);
	// 	setSocket(io.connect('http://localhost:80'))

    //     return;
	// }, []);

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('nickname');
        localStorage.removeItem('guest'); 
        localStorage.removeItem("reloadingRoomListPage");
        localStorage.removeItem("reloadingLoadingPage");
        localStorage.removeItem("reloadingChatingPage");
      }, [])

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
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('nickname');
            localStorage.removeItem('guest'); 
            localStorage.removeItem("reloadingRoomListPage");
            localStorage.removeItem("reloadingLoadingPage");
            localStorage.removeItem("reloadingChatingPage");
            const res = await requestApi(
				'/signin/basic',
				{ id: id, password: password },
				{},
				'post',
			);
			localStorage.setItem('access_token', `Bearer ${res.data.data.tokens.accessToken}`);
            localStorage.setItem('user_id', res.data.data.user.id);
            localStorage.setItem('nickname', res.data.data.user.nickname);
            localStorage.setItem('guest', res.data.data.user.guest); 
            
            socket.emit("online", localStorage.getItem("user_id"));   
            
            history.push('/main')
            return
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
                    <S.FormButton backgroundColor="white" color="#4843C4" borderColor="#4843C4" onClick={() => history.push('/guestLogin')}>게스트 아이디로 로그인</S.FormButton>
                    <S.FormLink onClick={() => history.push('/signup')}>회원가입하기</S.FormLink>
                </S.FormFooter>
            </S.FormWrap>
        </S.Container>
    );
}

export default Login;