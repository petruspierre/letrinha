import styled from "styled-components";

export const Svg = styled.svg`
  rect,
  path {
    transition: all 0.3s;
  }

  .primary {
    fill: ${({ theme }) => theme.colors.primary};
  }

  .secondary {
    fill: ${({ theme }) => theme.colors.secondary};
  }
`;
