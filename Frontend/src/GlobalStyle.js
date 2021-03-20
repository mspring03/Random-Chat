import { createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin:0;
        font-family:Noto Sans;
    }

    input, button {
        outline:none;
    }
`; 

export default GlobalStyle;