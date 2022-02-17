import Head from "next/head";
import Link from "next/link";
import {
  AnimatedContainer,
  ButtonsContainer,
  Container,
  Content,
} from "./styles";

const Home = () => {
  return (
    <>
      <Head>
        <title>Letrinha</title>
      </Head>
      <Container>
        <Content>
          <AnimatedContainer>
            {"Letrinha".split("").map((letter) => {
              return <span key={letter}>{letter}</span>;
            })}
          </AnimatedContainer>

          <ButtonsContainer>
            <Link href="/game">
              <a>Palavra do dia</a>
            </Link>
          </ButtonsContainer>
        </Content>
      </Container>
    </>
  );
};

export default Home;
