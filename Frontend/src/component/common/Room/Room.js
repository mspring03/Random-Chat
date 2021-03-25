import React, {useCallback, useState} from 'react';
import roomAddImage from '../../../assets/roomAddImage.svg'
import * as S from './style'

const Room = (props) => {
    
const {roomList} = props;
    return (
        <S.FormWrap>
            {roomList}
            <S.Formbutton>
                <S.Formimage src={roomAddImage} />
            </S.Formbutton>
        </S.FormWrap>
    )
}

export default Room
