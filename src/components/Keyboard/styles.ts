import styled from "styled-components";
import is from "styled-is";

interface IKeyboardButtonProps {
  exists: boolean;
  correctPlace: boolean;
  used: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 12.5rem;

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
      width: 8%;

      & + button {
        margin-left: 0.5rem;
      }
    }
  }
`;

export const KeyboardButton = styled.button<IKeyboardButtonProps>`
  height: 2.5rem;
  border-radius: 8px;
  text-align: center;
  text-transform: uppercase;

  background-color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.secondary};
  font-size: 1.25rem;

  transition: all 0.2s;

  ${is("used")`
    background-color: ${({ theme }) => theme.colors.primary};
  `}

  ${is("exists")`
    border-color: yellow;
    background-color: yellow;
  `}

  ${is("correctPlace")`
    border-color: green;
    background-color: green;
  `}
`;
