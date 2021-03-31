import styled, {css} from 'styled-components';

export const FormWrap = styled.ul`
    padding: 0px;
    margin: 13px 0px 13px 0px;
    overflow-y: scroll;
    height: 100%;
`;

export const Formbutton = styled.div`
    display: flex;
    margin-left: 10%;
    margin-bottom: 13px;
    height: 70px;
    background-color: #EBEBEB;
    border-radius:15px;
    align-items: center;
    justify-content:center;
`;

export const FormInput = styled.input`
    border-radius: 5px;
    width: 290px;
    padding: 1px 5px 0px 5px;
`;

export const Formimage = styled.img`
    height: 40px;
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