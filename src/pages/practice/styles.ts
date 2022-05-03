import styled from "styled-components";
import is from "styled-is";

interface IPreviewProps {
  exists?: boolean;
  correctPlace?: boolean;
}

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
  margin-bottom: 0.5rem;
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
  padding-right: 2px;

  @media screen and (min-width: 768px) {
    &::-webkit-scrollbar {
      width: 0.5rem;
      right: -1px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      width: 0.25rem;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 1rem;
    }
  }
`;

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 1rem 0 2rem;
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
    padding: 1rem 0 0.5rem;
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
