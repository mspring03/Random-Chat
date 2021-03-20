import styled, {css} from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display:flex;
`

export const AuthImage = styled.img`
    width:950px;
    object-fit:cover;
    height:100%;
`;

export const FormWrap = styled.div`
    width:350px;
    height:100%;
    margin:0 auto;
    box-sizing: border-box;
`;


export const FormHeader = styled.div`
    height:20%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:45px;
    font-weight:bold;
`;


export const FormBody = styled.div`
    height: 63%;
`;

export const FormFooter = styled.div``;

export const FormInput = styled.input`
    border:1px solid #707070;
    border-radius:15px;
    box-sizing:border-box;
    padding:16px 0;
    padding-left:10px;
    font-size:16px;
    color:#707070;
    width:100%;
    transition:250ms all;
    position:relative;

    & + & {
        margin-top:15px;
    }

    &.problem {
        border:1px solid red;
        color:red;

        &::placeholder {
            color:red;
        }
    }
`;

export const FormWarnMessage = styled.div`
    color: red;
    font-size: 7px;
    padding: 0px 7px 0px 7px;
    margin-left: 16px;
    position: relative;
    top: 9px;
    background-color: white;
    display:inline-block;
    opacity: ${props => props.message? 1 : 0};
`;

export const FormButton = styled.button`
    border-radius:12px;
    width:100%;
    font-size:20px;
    font-weight:bold;
    padding:13px 0;
    border:2px solid ${props => props.borderColor};
    color:${props => props.color};
    background:${props => props.backgroundColor};
    transition:220ms all;
    margin-bottom: 10px;

    &:hover {
        color:${props => props.backgroundColor};
        background:${props => props.color};
    }
`;

export const FormLink = styled.a`
    display: flex;
    font-weight: 350;
    color: #707070;
    text-decoration: underline;
    justify-content: center;
`; 
