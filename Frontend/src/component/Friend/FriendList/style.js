import styled, {css} from 'styled-components';

export const Container = styled.div`
    height:100%;
    display:flex;
    justify-content: flex-end;
    background-color:#EBEBEB;
    float: left;
    width: 40%;
`

export const Formbody = styled.div`
    height: 100%;
    width: 450px;
    background-color: #EBEBEB;
`;

export const FormTop = styled.div`
    padding-top: 45px;
    padding-left: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 20%;
`;

export const FormName = styled.div`
    font-size: 20px;
    font-weight: 650;
`;

export const FormMainBox = styled.div`
    width: 100%;
    height: 80%;
`;

export const FormList = styled.ul`
    box-sizing:border-box;
    overflow-y: scroll;
    width: calc(100%-7px);
    height: 100%;
    margin: 0px;
    padding: 0px;
    padding-right: 60px;
    margin-right:7px;
    overflow: auto;

    &::-webkit-scrollbar{
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #4843C4;	
    }
`;

export const FormBoxFrame = styled.li`
    list-style: none;
    width: 100%;
    height: 80px;
    margin-bottom: 22px;
`;

export const FormBox = styled.button`
    display: flex;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0px;
    box-shadow: 0px 1px 1px 0.1px #B2B0B0;
    background-color: #FFFFFF;
    border-radius: 15px;
    justify-content: space-between;
`;

export const profileImg = styled.div`
    height: 50px;
    width: 50px;
    margin: 15px;
    margin-left: 18px;
    margin-right: 18px;
    border-radius: 30px;
    box-sizing: border-box;
    background-color: #B7B7B7;
`;

export const FormUser = styled.div`
    height: 100%;
    width: 80%;
`;

export const UserInfo = styled.div`
    display: flex;
    height: 100%;
`;

export const UserNickName = styled.div`

`;

export const chating = styled.div`

`;

export const UserState = styled.div`

`;