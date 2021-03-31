import styled, {css} from 'styled-components';

export const Container = styled.div`
    height:100vh;
    display:flex;
    background-color:white;
    width: 60%;
    height: 87.5%;
`
export const Formbody = styled.div`
    height: 100%;
    width: 85%;
    margin-right: 15%;
    background-color: white;
`;

export const FormFrame = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 13px;
    height: 70px;
    background-color: #EBEBEB;
    border-radius:15px;
    align-items: center;
`;

export const Formname = styled.div`
    padding-top: 3px;
    margin-left: 23px;
    font-weight: 600;
    font-size: 20px;
    font-family:Noto Sans;
    float: left;
`;

export const Formpeople = styled.div`
    /* padding-top: 3px; */
    margin-right: 23px;
    font-size: 17px;
    color: #868686;
    font-family:Noto Sans;
`;

export const Formbox = styled.div`
    margin-top: 30%;
    margin-left:44%;
    font-size: 30px;
    color: #4843C4;
    font-weight: 600;
    font-family:Noto Sans;
`;

export const Back = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: #868686;
    border-radius: 15px;
    background-color: #EBEBEB;
    width: 20%;
    height: 50px;
    margin-left: 39%;
    margin-top: 5%;
`;