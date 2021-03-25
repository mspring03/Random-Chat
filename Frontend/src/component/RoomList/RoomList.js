import React, { useState, useCallback } from 'react';
import * as S from './style'
import searchIcon from '../../assets/searchIcon.svg'
import Room from '../common/Room/Room'

const RoomList = () => {
    const [search, setSearch] = useState('');
    
    const onChangeFormInput = (e) => {
        setSearch(e.target.value);
    }

    const list = [
        {
            tag: "게임",
            people: 10
        },
        {
            tag: '쿠키런 킹덤',
            people: 501
        },
        {
            tag: '대덕소프트웨어마이스터고 랜덤채팅방',
            people: 501
        }
    ]
   
    const [roomList, setRoomList] = useState(() => {
        const List = list.map(info => 
            <S.FormBoxFrame>
                <S.Formname>{info.tag}</S.Formname>
                <S.Formpeople>{info.people}명 접속중</S.Formpeople>
            </S.FormBoxFrame>
        )
        return List
    });

    const filter = useCallback(() => {
        const List = list.filter((value) => {
            if (search === '') return value;
            if (value.tag.includes(search)) return value;
        })

        if(List.length === 0) return;

        const htmlList = List.map(info => 
            <S.FormBoxFrame>
                <S.Formname>{info.tag}</S.Formname>
                <S.Formpeople>{info.people}명 접속중</S.Formpeople>
            </S.FormBoxFrame>
        )
        setRoomList(htmlList);
    }, [search])

    const loginPress = useCallback((e)=>{
		if(e.keyCode === 13){
			filter()
		}
    },[search]);

    return (
        <S.Container>
            <S.Formbody>
                <S.Formbox>
                    <S.Image src={searchIcon} onClick={() => alert('무야호')}/>
                    <S.FormInput onChange={onChangeFormInput} onKeyDown={loginPress} />
                </S.Formbox>
                <S.Formlist>
                    <Room roomList={roomList}/>
                </S.Formlist>
            </S.Formbody>
        </S.Container>
    )
}

export default RoomList