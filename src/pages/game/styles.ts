import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  height: calc(100vh - 5rem);
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
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.white};

    button svg {
      color: ${({ theme }) => theme.colors.white};
    }

    .Toastify__progress-bar {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
