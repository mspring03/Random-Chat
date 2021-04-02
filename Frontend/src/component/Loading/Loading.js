import React, { useState, useCallback, useEffect } from "react";
import * as S from "./style";
import "./css.scss";
import chatSocket from "../../lib/socket";
import { useHistory } from 'react-router-dom';

const Loading = () => {
  const [tag] = useState(localStorage.getItem('tag'));
  const [people, setPeople] = useState(0);
  const history = useHistory();
  const socket = chatSocket.getSocket();
  
  useEffect(async () => {
    const reloading = await localStorage.getItem("reloadingLoadingPage");
    if (reloading) {
        localStorage.removeItem("reloadingLoadingPage");
        socket.emit("online", localStorage.getItem("user_id"));
        history.push('/main')
    }
  }, [])

  useEffect(() => {
    window.addEventListener("beforeunload", async function(event) {
      await localStorage.setItem("reloadingLoadingPage", "true");
    });
  }, []);

  useEffect(() => {
    socket.on('numberOfPropleMyRoom', async (data) => {
        setPeople(data);
    });
  }, [])

  useEffect(() => {
    socket.emit('matching', localStorage.getItem('tag'))
  }, [])

  useEffect(() => {
    socket.on('join', async (roomName) => {
      socket.emit('roomjoin', roomName);
      console.log(1234);
      history.push('/chating');
      localStorage.setItem('roomName', roomName);
    })
  }, [])

  const onClick = useCallback(() => {
    socket.emit('outRoom', tag);
    history.push('/main');
  }, [])

  return (
    <S.Container>
      <S.Formbody>
        <S.FormFrame>
          <S.Formname>{tag}</S.Formname>
          <S.Formpeople>{people}명 접속중</S.Formpeople>
        </S.FormFrame>
        <S.Formbox />
        <div class="holder">
          <div class="preloader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <S.Back onClick={onClick}>나가기</S.Back>
      </S.Formbody>
    </S.Container>
  );
};

export default Loading;
