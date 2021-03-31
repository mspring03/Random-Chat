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
  
  useEffect(() => {
    const reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        socket.emit("online", localStorage.getItem("user_id"));
        history.push('/main')
    }
  })

  useEffect(() => {
    socket.on('numberOfPropleMyRoom', async (data) => {
        setPeople(data);
    });
  }, [])

  useEffect(() => {
    window.addEventListener("beforeunload", function(event) {
      sessionStorage.setItem("reloading", "true");
    });
  }, []);

  useEffect(() => {
    socket.emit('matching', localStorage.getItem('tag'))
  }, [])

  useEffect(() => {
    socket.on('join', async (roomName) => {
      socket.emit('roomjoin', roomName);
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
