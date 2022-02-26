import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    max-width: 300px;

    + button {
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    button + button {
      margin-top: 1rem;
    }
  }
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 2.25rem;
  font-style: italic;
  font-weight: 400;
  text-align: center;

  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
`;
