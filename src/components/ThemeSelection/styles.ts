import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.overlay};
`;

export const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -50%);
  -webkit-transform: translate(-55%, -50%);
  z-index: 3;
  width: calc(100% - 2rem);
  max-width: 420px;
  border-radius: 15px;
  padding: 20px;
  margin: 0 1rem;

  background: ${({ theme }) => theme.colors.white}; ;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.font.primary};
  font-size: 2.25rem;
  font-weight: 400;
  text-align: center;

  color: ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
`;
