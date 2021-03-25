import { createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body, #root {
        margin:0;
        font-family:Noto Sans;
        height: 100vh;
    }

    input, button {
        outline:none;
    }
`; 

export default GlobalStyle;