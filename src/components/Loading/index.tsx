import Logo from "../Logo";

import { AnimatedLoading, Container, Ring } from "./styles";

interface ILoadingProps {
  message?: string;
}

const Loading = ({ message }: ILoadingProps) => {
  return (
    <Container>
      <AnimatedLoading>
        <Ring>
          <Logo />
        </Ring>
      </AnimatedLoading>
      {message && <p>{message}</p>}
    </Container>
  );
};

export default Loading;
