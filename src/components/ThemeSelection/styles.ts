import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  button {
    max-width: 300px;

    + button {
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    button + button {
      margin-top: 1rem;
    }
  }
`;
