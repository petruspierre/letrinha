import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1120px;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  h1 {
    font-size: 2.25rem;
    margin: 0 1rem;
    color: ${({ theme }) => theme.colors.white};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
