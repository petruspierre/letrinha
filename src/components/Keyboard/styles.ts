import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 12.5rem;

  button {
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    text-align: center;
  }

  .actions {
    margin-bottom: 1rem;

    button {
      width: 6rem;

      & + button {
        margin-left: 0.5rem;
      }

      svg {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  .row {
    width: 100%;
    text-align: center;

    & + div {
      margin-top: 0.5rem;
    }

    button {
      color: ${({ theme }) => theme.colors.white};
      font-family: ${({ theme }) => theme.font.secondary};
      font-size: 1rem;

      width: 8%;

      & + button {
        margin-left: 0.5rem;
      }
    }
  }
`;
