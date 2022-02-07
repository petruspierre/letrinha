import styled from "styled-components";

export const Container = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 550px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: translate(-50%, -50%);
  z-index: 50;
  text-align: center;

  font-family: ${({ theme }) => theme.font.primary};

  padding: 1rem;
  border-radius: 15px;
  border: 3px solid ${({ theme }) => theme.colors.primary};

  button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1rem;
    font-family: ${({ theme }) => theme.font.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.225rem;
    margin-top: 0.5rem;

    strong {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    font-weight: 400;
  }

  h3 {
    margin-top: 1rem;
    font-weight: 400;

    .yellow {
      background-color: yellow;
    }

    .green {
      background-color: green;
      color: ${({ theme }) => theme.colors.white};
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

export const Overlay = styled.button`
  cursor: default;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 25;
`;
