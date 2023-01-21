import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translate(-50%, -30%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.overlay};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: calc(100% - 2rem);
  max-width: 500px;
  align-items: center;
  padding: 2rem 0;
  animation: ${fadeIn} 0.2s ease-in-out;
  max-height: calc(100vh - 1rem);
  overflow-y: scroll;

  background: ${({ theme }) => theme.colors.primary};

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 1rem;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 0;
  }
`;

export const CloseButton = styled.button`
  font-size: 1rem;
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
  height: 1.5rem;
  width: 1.5rem;
  opacity: 1;

  transition: opacity 0.3s;

  :hover {
    opacity: 0.8;
  }
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 1.75rem;
  font-style: italic;
  font-weight: 400;
  text-align: center;

  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
`;
