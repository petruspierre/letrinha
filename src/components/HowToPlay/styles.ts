import styled from "styled-components";
import is from "styled-is";

interface IPreviewProps {
  exists?: boolean;
  correctPlace?: boolean;
}

export const Container = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  color: ${({ theme }) => theme.colors.white};

  font-family: ${({ theme }) => theme.font.primary};

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;

    span {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.green};
    }

    &:first-child {
      margin-bottom: 1.5rem;
    }
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
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
