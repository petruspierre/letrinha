import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  height: 100%;

  .toast .Toastify__toast {
    height: 5rem;
    background-color: ${({ theme }) => darken(0.05, theme.colors.background)};
    color: ${({ theme }) => theme.colors.white};

    button svg {
      color: ${({ theme }) => theme.colors.white};
    }

    .Toastify__progress-bar {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  padding: 0 2rem;
  height: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  h1 {
    font-size: 2.25rem;
    margin: 0 1rem;
    color: ${({ theme }) => theme.colors.white};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  button:hover {
    transition: filter 0.2s;

    filter: brightness(0.8);
  }
`;
