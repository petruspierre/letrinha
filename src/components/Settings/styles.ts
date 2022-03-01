import styled from "styled-components";
import is from "styled-is";

interface IButtonProps {
  active: boolean;
}

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  text-align: center;
  gap: 0.75rem;
  margin-top: 2rem;

  span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
  }

  + div {
    margin-top: 4rem;
  }
`;

export const Button = styled.button<IButtonProps>`
  padding: 1.5rem 3rem;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  color: ${({ theme }) => theme.colors.white};
  opacity: 1;
  transition: all 0.2s;

  background-color: ${({ theme }) => theme.colors.yellow};

  ${is("active")`
    background-color: ${({ theme }) => theme.colors.green};
  `}

  &:hover {
    opacity: 0.8;
  }
`;

export const Slider = styled.div`
  width: 100%;
  display: flex;

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.5rem;
    outline: none;
    opacity: 0.8;
    overflow: hidden;
    transition: opacity 0.2s;
    position: relative;
    background-color: #ddd;
    border-radius: 0;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1rem;
      height: 2.5rem;
      background: ${({ theme }) => theme.colors.white};
      box-shadow: -100vw 0 0 100vw ${({ theme }) => theme.colors.green};
      box-sizing: border-box;
      cursor: pointer;
    }

    ::-moz-range-track {
      height: 1.5rem;
      background: #ddd;
    }

    &::-moz-range-thumb {
      width: 1rem;
      height: 2.5rem;
      background: ${({ theme }) => theme.colors.white};
      box-shadow: -100vw 0 0 100vw ${({ theme }) => theme.colors.green};
      box-sizing: border-box;
      border-radius: 0 !important;
      cursor: pointer;
    }
  }

  + label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
  }
`;
