import styled, { keyframes } from "styled-components";
import is from "styled-is";

interface FieldProps {
  isActive: boolean;
  exists: boolean;
  correctPlace: boolean;
  blur: boolean;
}

interface FieldsWrapperProps {
  columns: number;
  rows: number;
}

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(0px, 0, 0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const FieldsWrapper = styled.div<FieldsWrapperProps>`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns }) => columns},
    minmax(2rem, 3.5rem)
  );
  grid-template-rows: repeat(${({ rows }) => rows}, minmax(2rem, 3.5rem));
  grid-gap: 0.5rem;

  width: 100%;
  max-width: 374px;
  height: fit-content;
`;

export const Field = styled.button<FieldProps>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;

  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.primary};

  border: 0.25rem solid ${({ theme }) => theme.colors.primary};

  max-height: 5rem;
  max-width: 5rem;

  text-transform: uppercase;
  font-size: 2.5rem;
  font-style: italic;

  transition: all 0.1s ease-in-out;

  &:focus {
    outline: 0;
  }

  &::after {
    content: "";
    display: block;
    width: 1.25rem;
    height: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    bottom: 0.25rem;
    left: 25%;
    transform: translateX(-50%);
    transition: left cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s;
  }

  ${is("isActive")`
    padding-bottom: 0.5rem;
    animation: ${shake} 0.2s cubic-bezier(.36,.07,.19,.97)  both;
    backface-visibility: hidden;
    perspective: 1000px;
    transform: translate3d(0, 0, 0);

    &::after {
      left: 50%;
      height: 0.35rem;
    }
  `}

  ${is("blur")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    color: rgba(255, 255, 255, 0.5);
  `}

  ${is("exists")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
  `}

  ${is("correctPlace")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.green};
  `}
`;
