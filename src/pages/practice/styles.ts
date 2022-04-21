import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 5rem);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-family: ${({ theme }) => theme.font.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const Error = styled.p`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.font.primary};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const GameFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  overflow: auto;
`;

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 1rem 0 0.5rem;
  transition: background-color 0.2s;
  background-color: ${({ theme }) => theme.colors.secondary};

  width: calc(100% - 2rem);

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.font.primary};
  }

  @media screen and (min-width: 768px) {
    max-width: 553px;
  }
`;

export const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  padding: 1rem 2rem;
  margin-top: 1rem;

  transition: all 0.2s;

  & + button {
    a {
      color: ${({ theme }) => theme.colors.secondary};
    }
    background-color: ${({ theme }) => theme.colors.white};
  }

  & :hover {
    filter: brightness(0.8);
  }

  @media screen and (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }
`;
