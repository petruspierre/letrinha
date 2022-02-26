import styled from "styled-components";

export const GameOverWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;

  padding: 2rem;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);

  h2,
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  h2 {
    font-size: 2rem;
  }

  p {
    margin-top: 0.25rem;
    font-size: 1.125rem;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;~
  font-family: ${({ theme }) => theme.font.primary};
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 8px;

  transition: all 0.2s;

  & + button {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.secondary};
    margin-top: 0.5rem;
  }

  & :hover {
    filter: brightness(0.8);
  }
`;
