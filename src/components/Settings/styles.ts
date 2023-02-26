import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 1rem;
  width: 100%;

  table {
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    font-family: ${({ theme }) => theme.font.primary};
    margin-bottom: 1rem;

    tr {
      display: flex;
      justify-content: space-between;
    }
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
    opacity: 0.9;
    overflow: hidden;
    transition: opacity 0.2s;
    position: relative;
    background-color: #ddd;
    border-radius: 1rem;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1rem;
      height: 2.5rem;
      background: ${({ theme }) => theme.colors.white};
      box-shadow: -100vw 0 0 100vw ${({ theme }) => theme.colors.secondary};
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
`;
