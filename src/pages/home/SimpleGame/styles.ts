import styled, { keyframes } from "styled-components";
import is from "styled-is";

interface FieldProps {
  isActive: boolean;
  exists: boolean;
  correctPlace: boolean;
}

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

export const Container = styled.div`
  padding: 2rem 1rem;
  height: 100%;
`;

export const FieldsContainer = styled.section`
  height: calc(100% - 2rem);
`;

export const FieldWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  animation: ${fadeIn} 0.3s ease-in-out;

  & + div {
    margin-top: 1rem;
  }
`;

export const Field = styled.div<FieldProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  height: 3.5rem;
  width: 3.5rem;

  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.primary};
  text-transform: uppercase;
  font-size: 2rem;

  transition: all 0.1s ease-in-out;

  ${is("isActive")`
    border-bottom-width: 6px;
  `}

  ${is("exists")`
    border-color: yellow;
  `}

  ${is("correctPlace")`
    border-color: green;
  `}
`;

export const Footer = styled.section`
  display: flex;
  width: 100%;

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.font.primary};
  }
`;
