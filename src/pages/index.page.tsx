import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PracticeDifficulty } from "~/components";
import { useToggle } from "~/hooks/useToogle";

import {
  AnimatedContainer,
  AnimatedLetter,
  Button,
  ButtonsContainer,
  Container,
  Content,
} from "./styles";

const Home = () => {
  const { toggle: togglePracticeDifficulty, value: showPracticeDifficulty } =
    useToggle(false);

  const router = useRouter();

  const onSelectPracticeDifficulty = (option: "5" | "6") => {
    router.push(`/practice/${option}`);
  };

  return (
    <>
      <Head>
        <title>Letrinha</title>
      </Head>
      <Container>
        <Content>
          <AnimatedContainer>
            {"Letrinha".split("").map((letter, index) => {
              return (
                <AnimatedLetter key={letter} isLast={index === 7}>
                  {letter}
                </AnimatedLetter>
              );
            })}
          </AnimatedContainer>

          <ButtonsContainer>
            <Link href="/game">
              <a>Palavra do dia</a>
            </Link>
            <Button onClick={togglePracticeDifficulty}>Modo treino</Button>
            <Button disabled>Modo duelo</Button>
          </ButtonsContainer>
        </Content>
        {showPracticeDifficulty && (
          <PracticeDifficulty
            onSelect={onSelectPracticeDifficulty}
            dismiss={togglePracticeDifficulty}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
