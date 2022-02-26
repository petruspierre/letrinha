import styled, { keyframes } from "styled-components";

export const Container = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  font-family: ${({ theme }) => theme.font.primary};

  p {
    font-size: 1.225rem;
    margin-top: 0.5rem;

    strong {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2rem;
    font-weight: 400;
  }

  h3 {
    margin-top: 1rem;
    font-weight: 400;

    .yellow {
      background-color: ${({ theme }) => theme.colors.yellow};
    }

    .green {
      background-color: ${({ theme }) => theme.colors.green};
    }
  }

  small {
    display: block;
    margin-top: 1rem;
    font-weight: 300;
    font-size: 0.825rem;
    font-family: ${({ theme }) => theme.font.secondary};
  }
`;
