import styled from "styled-components";
import is from "styled-is";

interface IKeyboardWrapperProps {
  isVisible: boolean;
}

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
  height: auto;

  .actions {
    button {
      width: 6rem;

      & + button {
        margin-left: 0.5rem;
      }

      svg {
        color: ${({ theme }) => theme.colors.white};
      }

      transition: all 0.2s;

      &:hover {
        filter: brightness(0.8);
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
      & + button {
        margin-left: 1.25%;
      }
    }
  }
`;

export const KeyboardWrapper = styled.div<IKeyboardWrapperProps>`
  max-height: 0;
  overflow: hidden;
  width: 100%;
  margin-top: 0rem;

  transition: all 0.2s ease-in-out;

  ${is("isVisible")`
    max-height: 12.5rem;
    margin-top: 1rem;
  `}
`;

export const KeyboardButton = styled.button<IKeyboardButtonProps>`
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  line-height: 3.25rem;
  padding-top: 0.25rem;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  font-size: 2.75rem;
  width: 8%;

  transition: all 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  &.dual {
    width: 26.5%;
    text-transform: none;
  }

  ${is("used")`
    background-color: ${({ theme }) => theme.colors.primary};
    color: rgba(255, 255, 255, 0.5);
  `}

  ${is("exists")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.white};
  `}

  ${is("correctPlace")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  `}

  img {
    height: 1.75rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    line-height: 2.75rem;
    padding-top: 0rem;

    img {
      height: 1.35rem;
    }
  }
`;
