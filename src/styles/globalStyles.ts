import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Varela+Round&display=swap');

  body {
    font-family: 'Varela Round', sans-serif;
    background-color: #f9f7f1;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Mochiy Pop One', sans-serif;
  }
`;

export default GlobalStyle;
