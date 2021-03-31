import React, { useState, useCallback, useEffect } from "react";
import * as S from "./style";
import { useHistory } from "react-router-dom";
import searchIcon from "../../assets/searchIcon.svg";
import Room from "../common/Room/Room";
import chatSocket from "../../lib/socket";

const socket = chatSocket.getSocket();

const RoomList = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  // const [state, setState] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const history = useHistory();

  const onChangeFormInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    socket.on("numberOfPeopleAllRoom", async (data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    const reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        console.log(13241324);
        socket.emit("online", localStorage.getItem("user_id"));
    }
  }, [])
  
  useEffect(() => {
    window.addEventListener("beforeunload", function(event) {
      sessionStorage.setItem("reloading", "true");
    });
  }, []);


  const enterRoom = (e) => {
    localStorage.setItem('tag', e.target.firstChild.innerText)
    history.push('/loading')
    socket.emit("joinRoom", e.target.firstChild.innerText);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", function(event) {
      event.returnValue = "Write something clever here..";
      history.push('/main')
    });
  }, []);

  useEffect(() => {
    const List = list.map((info) => (
      <S.FormBoxFrame key={info._id} onClick={enterRoom}>
        <S.Formname>{info._id}</S.Formname>
        <S.Formpeople>{info.people}명 접속중</S.Formpeople>
      </S.FormBoxFrame>
    ));
    setRoomList(List);
  }, [list]);

  useEffect(() => {
    setViewList(roomList);
  }, [roomList]);

  const filter = useCallback(() => {
    if (search === "") {
      setViewList(roomList);
      return;
    }

    const List = list.filter((value) => {
      if (value._id.includes(search)) return value;
    });

    if (List.length === 0) return;

    const htmlList = List.map((info) => (
      <S.FormBoxFrame key={info._id} onClick={enterRoom}>
        <S.Formname>{info._id}</S.Formname>
        <S.Formpeople>{info.people}명 접속중</S.Formpeople>
      </S.FormBoxFrame>
    ));

    setViewList(htmlList);
  }, [list, search]);

  const loginPress = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        filter();
        chatSocket.test();
      }
    },
    [list, search]
  );

  // c

  return (
    <S.Container>
      <S.Formbody>
        <S.Formbox>
          <S.Image src={searchIcon} onClick={() => {
            console.log(localStorage.getItem('nickname'));
          }} />
          <S.FormInput onChange={onChangeFormInput} onKeyDown={loginPress} />
        </S.Formbox>
        <S.Formlist>
          <Room
            roomList={viewList}
            setViewList={setViewList}
            viewList={viewList}
            enterRoom={enterRoom}
          />
        </S.Formlist>
      </S.Formbody>
    </S.Container>
  );
};

export default RoomList;
