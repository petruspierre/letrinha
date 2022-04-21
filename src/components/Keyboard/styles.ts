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

interface IArrowProps {
  keyboardVisible: boolean;
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
      display: flex;
      gap: 1rem;
      align-items: center;

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

    @media screen and (max-width: 768px) {
      p {
        visibility: hidden;
        display: none;
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

export const Arrow = styled.img<IArrowProps>`
  width: 14px;
  height: 7px;
  transform: rotate(0);
  transition: all 0.3s;

  ${is("keyboardVisible")`
    transform: rotate(-180deg);
  `}
`;

export const KeyboardWrapper = styled.div<IKeyboardWrapperProps>`
  max-height: 0;
  overflow: hidden;
  width: 100%;
  margin-bottom: 0rem;

  transition: all 0.3s ease-in-out;

  ${is("isVisible")`
    max-height: 12.5rem;
    margin-bottom: 0.5rem;
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
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
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
