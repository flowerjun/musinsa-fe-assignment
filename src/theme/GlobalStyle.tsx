import { createGlobalStyle } from 'styled-components';

import { color } from './theme';

// ----------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${color.white};
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  input {
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }

  input {
    border: none;
    outline: none;
    background-color: transparent;
  }
  input::placeholder {
    color: ${color.oldGray6};
  }

  button {
    margin: 0;
    text-decoration: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
  }
  button:focus {
    outline: none;
  }
`;

export default GlobalStyle;
