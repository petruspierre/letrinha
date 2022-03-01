import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 374px;
  padding: 0 2rem;
  height: 5rem;
  margin: 0 auto;
`;

export const LogoButton = styled.button`
  svg {
    height: 3rem;
    max-width: 2.5rem;
  }
`;

export const Button = styled.button`
  opacity: 0.75;
  transition: opacity 0.2s;

  img {
    max-width: 1.5rem;
    max-height: 1.5rem;
  }

  &:hover {
    opacity: 1;
  }
`;
