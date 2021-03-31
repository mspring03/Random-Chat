import React, { useState, useCallback, useEffect } from "react";
import * as S from "./style";
import { useHistory } from "react-router-dom";
import chatSocket from "../../lib/socket";
import date from "../../lib/date";
import sendImg from "../../assets/sendImg.svg";

const socket = chatSocket.getSocket();

const Chating = () => {
  const [name, setName] = useState("%%%%%");
  const [tag, setTag] = useState("%%%%%%%%%%%%%");
  const [data, setData] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [lastLog, setLastLog] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(async () => {
    const reloading = await localStorage.getItem("reloading");
    console.log(reloading);
    if (reloading) {
      localStorage.removeItem("reloading");
      socket.emit("online", localStorage.getItem("user_id"));
      history.replace("/main");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", async function (event) {
      await localStorage.setItem("reloading", "true");
    });
  }, []);

  useEffect(() => {
    socket.on("randomUserFindingCompete", async (data) => {
      if (data["info1"].id === localStorage.getItem("user_id")) {
        setName(data["info2"].nickname);
        setTag(data["info2"].tag);
      } else {
        setName(data["info1"].nickname);
        setTag(data["info1"].tag);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("chatEnd", () => {
      let list = [...messageList];
      list.push(
        <S.FormBoxFrame>
          <S.event>
            <S.eventChat>상대방이 연결을 종료하였습니다.</S.eventChat>
          </S.event>
        </S.FormBoxFrame>
      );

      setMessageList(list);
      socket.emit("roomClear", localStorage.getItem("roomName"));
      // history.push("loading");
    });
  }, [messageList]);

  useEffect(() => {
    socket.on("message", (data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    listUpdate();
  }, [data]);

  useEffect(() => {
    document.getElementById(
      "messageWrapper"
    ).scrollTop = document.getElementById("messageWrapper").scrollHeight;
  }, [messageList]);

  const listUpdate = useCallback(() => {
    let list = [...messageList];
    if (!data["nickname"]) return;
    if (data["nickname"] === localStorage.getItem("nickname")) {
      if (lastLog !== data["nickname"]) {
        list.push(
          <S.FormBoxFrame key={messageList.length}>
            <S.FormBoxMyInfo>
              <S.MyInfo>
                <S.Date>{date()}</S.Date>
              </S.MyInfo>
              <S.myMessage>
                <S.messageBox>{data["data"]}</S.messageBox>
              </S.myMessage>
            </S.FormBoxMyInfo>
          </S.FormBoxFrame>
        );
      }
      if (lastLog === data["nickname"]) {
        list.push(
          <S.FormBoxFrame key={messageList.length}>
            <S.FormBoxMyInfo>
              <S.myMessage>
                <S.messageBox>{data["data"]}</S.messageBox>
              </S.myMessage>
            </S.FormBoxMyInfo>
          </S.FormBoxFrame>
        );
      }
    }
    if (data["nickname"] !== localStorage.getItem("nickname")) {
      if (lastLog !== data["nickname"]) {
        list.push(
          <S.FormBoxFrame key={messageList.length}>
            <S.FormBoxPeopleInfo>
              <S.Info>
                <S.Name>{data["nickname"]}</S.Name>
                <S.Date>{date()}</S.Date>
              </S.Info>
              <S.message>
                <S.messageBox>{data["data"]}</S.messageBox>
              </S.message>
            </S.FormBoxPeopleInfo>
          </S.FormBoxFrame>
        );
      }
      if (lastLog === data["nickname"]) {
        list.push(
          <S.FormBoxFrame key={messageList.length}>
            <S.FormBoxPeopleInfo>
              <S.message>
                <S.messageBox>{data["data"]}</S.messageBox>
              </S.message>
            </S.FormBoxPeopleInfo>
          </S.FormBoxFrame>
        );
      }
    }
    setMessageList(list);
    setLastLog(data["nickname"]);
  }, [data, messageList, setMessageList]);

  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const onClick = () => {
    if (message.length !== 0) {
      document.getElementById("Input").value = "";

      socket.emit("messageSend", {
        data: message,
        nickname: localStorage.getItem("nickname"),
        roomName: localStorage.getItem("roomName"),
      });
    }
  };

  const Press = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        onClick();
      }
    },
    [message]
  );

  return (
    <S.Container>
      <S.Formbody>
        <S.FormOptionsWrapper></S.FormOptionsWrapper>
        <S.ChatingBox>
          <S.UserProfile>
            <S.FormUserImage>
              <S.Image />
            </S.FormUserImage>
            <S.UserInfo>
              <S.UserNickName>{name}</S.UserNickName>
              <S.UserTag>{tag}</S.UserTag>
            </S.UserInfo>
          </S.UserProfile>
          <S.line />
          <S.Chat>
            <S.FormChating>
              <S.FormWrap id="messageWrapper">{messageList}</S.FormWrap>
            </S.FormChating>
            <S.FormInput>
              <S.Input id="Input" onChange={onChange} onKeyDown={Press} />
              <S.InputImage src={sendImg} onClick={onClick} />
            </S.FormInput>
          </S.Chat>
        </S.ChatingBox>
      </S.Formbody>
    </S.Container>
  );
};

export default Chating;
