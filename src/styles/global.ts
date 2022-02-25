import { darken } from "polished";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    transition: all 0.2s;

    background-color: ${({ theme }) => theme.colors.secondary};

    .toast .Toastify__toast {
      height: 5rem;
      background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
      color: ${({ theme }) => theme.colors.white};

      button svg {
        color: ${({ theme }) => theme.colors.white};
      }

      .Toastify__progress-bar {
        background: ${({ theme }) => theme.colors.secondary};
      }
    }

  a {
    text-decoration: none;
  }

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }

  h1, h2, label, a, p, span, input, li {
    font-family: ${(props) => props.theme.font.primary};
    font-weight: 900;
    font-style: italic;
  }

  button {
    font-family: ${(props) => props.theme.font.secondary};
  }

  fieldset {
    border: 0;
  }

  input {
    outline: none;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }
`;
