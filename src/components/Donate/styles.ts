import styled from "styled-components";

export const Container = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  font-family: ${({ theme }) => theme.font.primary};

  p:first-child {
    max-width: 300px;
    margin-bottom: 1rem;
  }

  p button {
    opacity: 1;

    margin-left: 1rem;
    color: white;
    font-family: ${({ theme }) => theme.font.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 0.25rem 0.5rem;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const QRContainer = styled.div`
  background: white;
  padding: 1rem;
  margin: 1rem 0;
`;
