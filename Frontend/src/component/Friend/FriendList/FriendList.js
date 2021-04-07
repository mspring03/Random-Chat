import React from 'react';
import * as S from "./style";


const FriendList = () => {
    return (
        <S.Container>
            <S.Formbody>
                <S.FormTop>
                    <S.FormName>
                        랜덤챗
                    </S.FormName>
                </S.FormTop>
                <S.FormMainBox>
                    <S.FormList>
                        <S.FormBoxFrame>
                            <S.FormBox>
                                <S.profileImg>

                                </S.profileImg>
                                <S.FormUser>
                                    <S.FormUser>
                                        <S.UserNickName>
                                            망나나망   
                                        </S.UserNickName>
                                        <S.chating>
                                            동해물과 백두산이 마르고 닳도록
                                        </S.chating>
                                    </S.FormUser>
                                    <S.UserState>
                                        
                                    </S.UserState>
                                </S.FormUser>
                            </S.FormBox>
                        </S.FormBoxFrame>
                        <S.FormBoxFrame>
                            <S.FormBox>

                            </S.FormBox>
                        </S.FormBoxFrame>
                        <S.FormBoxFrame>
                            <S.FormBox>

                            </S.FormBox>
                        </S.FormBoxFrame>
                    </S.FormList>
                </S.FormMainBox>
            </S.Formbody>
        </S.Container>
    )
}

export default FriendList;