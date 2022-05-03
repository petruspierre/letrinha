import styled from "styled-components";

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 2rem;
`;

export const Option = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  transition: filter 0.3s;

  & + button {
    margin-left: 1rem;
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
