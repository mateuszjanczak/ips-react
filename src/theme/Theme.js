import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
  
    html {
        background: #e9c46a;
    }
  
    body {
        margin: 0;
        padding: 0;
    }
    
    *:focus {
    outline: none;
}
`;

export default GlobalStyle;