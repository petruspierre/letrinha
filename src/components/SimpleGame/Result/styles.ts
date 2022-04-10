import styled from "styled-components";
import is from "styled-is";

interface IPreviewProps {
  exists?: boolean;
  correctPlace?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 0 2rem 2rem;
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

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
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
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.secondary};
  }

  & :hover {
    filter: brightness(0.8);
  }

  @media screen and (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

export const Preview = styled.div<IPreviewProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 2.5rem;
  width: 2.5rem;
  background: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);

  ${is("exists")`
    background: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.white};
  `}

  ${is("correctPlace")`
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  `}
`;
