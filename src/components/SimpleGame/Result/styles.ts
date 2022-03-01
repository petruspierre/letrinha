import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 2rem;
  text-align: center;

  h2,
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  h2 {
    padding-bottom: 0 !important;
  }

  p {
    margin-top: 0.25rem;
    font-size: 1.5rem;
  }

  span {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  padding: 1rem 2rem;
  width: 15rem;
  margin-top: 1rem;

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
