import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100vh;
    width: 100%;
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
    background-color: #FBFBFB;
  }

  button {
    font-family: 'Noto Sans', sans-serif;
  }
`;
