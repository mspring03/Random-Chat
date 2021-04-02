import styled, {css} from 'styled-components';

export const Container = styled.div`
    height:100vh;
    display:flex;
    width: 60%;
    height:12.5%;
`

export const Formbody = styled.div`
    display: flex;
    box-sizing: border-box;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    margin-right: 15%;
    padding: 5% 0px;
`;

export const FormBox = styled.div`
    margin-left: 4%;
    margin-right: 4%;
    font-size: 22px;
    margin-top: 5px;
    font-weight: 500;
    &:hover {
        cursor: pointer;
    }

    & + & + &{
        color: #4843C4;
        margin-right: 3%;
    }
`;