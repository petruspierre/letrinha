import styled, { keyframes } from "styled-components";
import is, { isNot } from "styled-is";

const fadeIn = keyframes`
  from {
    transform: translateY(-25%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateY(0%);
    opacity: 1;
  }

  to {
    transform: translateY(-25%);
    opacity: 0;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 6rem;
  right: 2rem;

  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;

  max-width: calc(100% - 4rem);

  padding: 1rem 2rem;
  animation: 0.3s ease-in-out ${fadeIn}, 0.3s ease-in-out 1.7s ${fadeOut};

  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.21);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.21);

  p,
  h3 {
    color: ${({ theme }) => theme.colors.white};
  }

  h3 {
    font-family: ${({ theme }) => theme.font.primary};
  }
`;
