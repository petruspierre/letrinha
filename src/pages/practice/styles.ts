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
