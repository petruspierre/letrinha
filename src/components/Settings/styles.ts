import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Slider = styled.div`
  width: 100%;

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      background: #04aa6d;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      background: #04aa6d;
      cursor: pointer;
    }
  }
`;
