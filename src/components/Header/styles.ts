import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 415px;
  padding: 0 2rem;
  height: 5rem;
  margin: 0 auto;
`;

export const LogoButton = styled.button`
  svg {
    height: 3rem;
  }
`;

export const Button = styled.button`
  opacity: 0.75;
  transition: opacity 0.2s;

  svg {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    opacity: 1;
  }
`;
