import styled from 'styled-components';

export const Container = styled.div`
    height:100vh;
    display:flex;
    background-color:white;
    width: 60%;
    height: 87.5%;
`

export const Formbody = styled.div`
    height: 100%;
    width: 100%;
    margin-right: 15%;
    background-color: white;
    display: flex;
    justify-content: flex-end;
`;

export const FormOptionsWrapper = styled.div`
    border-radius: 15px 0px 0px 15px;
    background-color: #EBEBEB;
    height: 250px;
    width: 7%;
`;

export const option = styled.div`

`;

export const UserProfile = styled.div`
    display: flex;
    height: 50px;
    width: 100%;
`;

export const ChatingBox = styled.div`
    display: inline;
    justify-content: center;
    border-radius: 0px 15px 15px 15px;
    background-color: #EBEBEB;
    height: 95%;
    width: 90%;
`;

export const FormUserImage = styled.div`
    padding: 15px;
    width: 50px;
    height: 50px;
`;

export const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: #B7B7B7;
`;

export const UserInfo = styled.div`
    width: 70%;
    height: 50px;
    margin-left: 7px;
`;

export const UserNickName = styled.div`
    margin-top:20px;
    font-size: 19px;
    font-weight: 450;
    color: #4843C4;
`;

export const UserTag = styled.div`
    margin-top: 3px;
    font-size: 16px;
    font-weight: 350;
    color: #707070;
`;

export const line = styled.div`
    background-color: #B2B0B0;
    height: 0.5px;
    width: 95.5%;
    margin-top: 30px;
    margin-left: 12px;
    margin-bottom: 15px;
`;

export const FormChating = styled.div`
    height: 90%;
    width: 100%;
    box-sizing: border-box;
`;

export const FormWrap = styled.ul`
    box-sizing: border-box;
    padding-left: 13px;
    padding-right: 13px;
    padding-bottom: 1px;
    margin: 100px 0px 0px 0px;
    overflow-y: scroll;
    height: 87%;
    --ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const FormBoxFrame = styled.li`
    list-style: none;
    display: flex;
    flex-wrap:wrap;
    width: 100%;
`;

export const FormBoxPeopleInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    flex-wrap: wrap;
`;

export const FormBoxMyInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    flex-wrap: wrap;
`;

export const Info = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 5px;
    margin-right: auto;
`;

export const MyInfo = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 5px;
    justify-content: flex-end;
    margin-right: 10px;
`;

export const message = styled.div`
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    width: 60%;
`;

export const myMessage = styled.div`
    margin-bottom: 5px;
    display: flex;
    width: 60%;
    justify-content: flex-end;
    flex-wrap: wrap;
`;

export const Name = styled.div`
    font-size: 19px;
    font-weight: 450;
    color: #000000;
`;

export const Date = styled.div`
    font-size: 12px;
    bottom: 100%;
    color: #868686;
    padding-left: 12px;
    padding-top: 10px;
`;

export const messageBox = styled.div`
    background-color: #FFFFFF;
    margin-left: -5px;
    border-radius: 10px;
    padding: 13px 22px;
    box-shadow: 0px 1px 1px 0.1px #B2B0B0;
    font-size: 16px;
    font-weight: 350;
    word-break:break-all;
`;

export const FormInput = styled.div`
    height: 45px;
    margin-top: -5px;
    padding: 0px 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 28px;
    border: none;
    padding: 1px 52px 0px 20px;
    font-size: 16px;
    font-weight: 350;
`;

export const InputImage = styled.img`
    margin-left: -45px;
    margin-top: 8px;
    position: absolute;
    height: 30px;
`;

export const Chat = styled.div`
    height: 100%;
    margin-top: -100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const FormChat = styled.div`
    display: flex;
    flex-direction: column;
`;

export const event = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #9490FF;
    border-radius: 15px;
    margin-bottom: 10%;
`;

export const eventChat = styled.div`
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 350;
    color: white;
`;