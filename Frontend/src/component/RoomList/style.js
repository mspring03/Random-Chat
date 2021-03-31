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
    width: 100%;
    margin-right: 15%;
    background-color: white;
`;

export const Formlist = styled.div`
    height: 87.5%;
    overflow: hidden;
    width: 100%;
`;

export const Formbox = styled.div`
    display: flex;
    margin-left: 10%;
    height: 70px;
    background-color: #EBEBEB;
    border-radius:15px;
    align-items: center;
`;

export const FormBoxFrame = styled.li`
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
    margin-bottom: 13px;
    height: 70px;
    background-color: #EBEBEB;
    border-radius:15px;
    align-items: center;
`;

export const Image = styled.img`
    object-fit:cover;
    height: 45%;
    margin-left:3.5%;
    margin-right:2%;
`;

export const FormInput = styled.input`  
    box-sizing:border-box;
    background-color: white;
    border-radius:28px;
    width: 87%;
    height:50%;
    padding: 3px 20px 0px 20px;
    border:1px solid white;
    font-size: 20px;
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