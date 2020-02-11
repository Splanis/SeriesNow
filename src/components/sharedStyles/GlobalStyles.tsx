import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,   
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 16px; 
    }

    body{ 
        background: #212121;
        color: white;
    }
`;

export default GlobalStyles;
