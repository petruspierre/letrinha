import styled from "styled-components";
import is from "styled-is";

interface PreviewProps {
  color: string;
}

interface ContainerProps {
  active: boolean;
}

export const Container = styled.button<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: ease-in-out 0.3s;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.25rem;
  color: ${({ theme }) => theme.colors.primary};
  align-items: center;

  position: relative;

  &:after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    opacity: 0;
    transition: ease-in-out 0.3s;
    width: 10px;
    height: 20px;
    background: transparent;
    border: solid white;
    border-width: 3px 0 0 3px;
    transform: rotate(-90deg);
  }

  ${is("active")`
    opacity: 0.8;
    margin-left: -4.5rem;

    &:after {
      opacity: 1;
      content: "";
      display: block;
      width: 10px;
      height: 20px;
      background: transparent;
      border: solid white;
      border-width: 3px 0 0 3px;
      transform: rotate(-135deg);
      right: -2.5rem;
    }
  `}

  :hover {
    opacity: 0.7;
  }

  > div {
    display: flex;
    gap: 0.5rem;
  }

  span {
    font-size: 1.75rem;
    font-weight: 300;
    font-family: ${({ theme }) => theme.font.primary};
    width: 100%;
    padding-left: 1.25rem;
  }

  @media screen and (max-width: 768px) {
    ${is("active")`
      margin-left: -2rem;
      
      &:after {
        width: 8px;
        height: 16px;
        right: -1.5rem;
      }
    `}
  }
`;

export const Preview = styled.div<PreviewProps>`
  width: 3.5rem;
  height: 3.5rem;
  background: ${(props) => props.color};
`;
