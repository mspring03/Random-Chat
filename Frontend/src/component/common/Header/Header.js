import React, { useCallback } from 'react';
import * as S from './style'
import chatSocket from "../../../lib/socket";
import { useHistory } from "react-router-dom";

const socket = chatSocket.getSocket();

const Header = () => {
    const history = useHistory();
  
    const out = useCallback(() => {
        socket.emit('outRoom', localStorage.getItem("tag"))
        socket.emit('roomClosing', localStorage.getItem("roomName"))
        socket.emit('roomClear', localStorage.getItem("roomName"))
        history.push('/main')
        localStorage.removeItem("tag");
        localStorage.removeItem("roomName");
    }, [])

    const Logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('nickname');
        localStorage.removeItem('guest'); 
        localStorage.removeItem("reloadingRoomListPage");
        localStorage.removeItem("reloadingLoadingPage");
        localStorage.removeItem("reloadingChatingPage");
        socket.emit('outRoom', localStorage.getItem("tag"));
        socket.emit('roomClosing', localStorage.getItem("roomName"));
        socket.emit('roomClear', localStorage.getItem("roomName"));
        socket.emit('logout');
        history.push('/login')
    }, [])

    return (
        <S.Container>
            <S.Formbody>
                <S.FormBox onClick={out}>
                    채팅방목록
                </S.FormBox>
                <S.FormBox>
                    마이페이지
                </S.FormBox>
                <S.FormBox onClick={Logout}>
                    로그아웃
                </S.FormBox>
            </S.Formbody>
        </S.Container>
    )
}

export default Header
