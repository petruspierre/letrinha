import styled from "styled-components";

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
  margin-bottom: 1rem;
  transition: all 0.2s;

  :hover {
    opacity: 0.7;
  }

  > div {
    display: flex;
    gap: 0.5rem;
  }

  span {
    font-size: 2.25rem;
    font-weight: 300;
    font-family: ${({ theme }) => theme.font.primary};
    ${(props) =>
      props.active && `border-bottom: 5px solid ${props.theme.colors.primary};`}
  }
`;

export const Preview = styled.div<PreviewProps>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: ${(props) => props.color};
`;
