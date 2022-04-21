import Head from "next/head";
import { GetServerSideProps } from "next";

import { getRandomPracticeWord } from "~/services/practice";

import {
  Button,
  ButtonWrapper,
  Container,
  Error,
  Footer,
  GameFrame,
  Result,
  Title,
} from "./styles";
import { Canva, Keyboard } from "~/components";
import usePracticeGame from "~/store/modules/practiceGame";
import { useEffect, useState } from "react";
import { useToggle } from "~/hooks/useToogle";
import useSettings from "~/store/modules/settings";
import Modal from "~/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";

interface PracticeProps {
  words: {
    word: string;
  }[];
}

const Game = ({ words }: PracticeProps) => {
  const [showResult, setShowResult] = useState(false);
  const {
    practiceGame: {
      word,
      wordLength,
      attempts,
      selectedGuessIndex,
      selectedLetterIndex,
      guesses,
      isGameOver,
      keyboard,
    },
    onAppendLetter,
    onPopLetter,
    onSubmitGuess,
    newGame,
    selectLetter,
  } = usePracticeGame();
  const { settings } = useSettings();
  const router = useRouter();

  const { value: keyboardVisible, toggle: toggleKeyboard } = useToggle(
    !settings.keyboardHidden
  );

  useEffect(() => {
    if (words.length > 0) {
      newGame(words[0].word, 6);
    }
  }, [newGame, words]);

  useEffect(() => {
    if (isGameOver) {
      setShowResult(true);
    }
  }, [isGameOver]);

  return (
    <>
      <Head>
        <title>Modo treino | Letrinha</title>
      </Head>
      {showResult && (
        <Modal dismiss={() => setShowResult(false)} title="Treino finalizado!">
          <Result>
            <p>Deseja tentar novamente?</p>
            <ButtonWrapper>
              <Button onClick={router.reload}>Treinar</Button>
              <Button>
                <Link href="/">
                  <a>Pagina inicial</a>
                </Link>
              </Button>
            </ButtonWrapper>
          </Result>
        </Modal>
      )}
      {word ? (
        <Container>
          <Title>Modo treino</Title>
          <GameFrame>
            {words.map(({ word }, index) => {
              return (
                <Canva
                  wordLength={wordLength}
                  attempts={guesses.length}
                  selectedGuess={selectedGuessIndex}
                  selectedLetter={selectedLetterIndex}
                  onLetterClick={(letter) => selectLetter(letter)}
                  guesses={guesses}
                  index={index}
                  key={word}
                  isGameOver={isGameOver}
                />
              );
            })}
          </GameFrame>
          <Footer>
            <Keyboard
              addLetter={onAppendLetter}
              popLetter={onPopLetter}
              submit={onSubmitGuess}
              state={keyboard}
              isVisible={keyboardVisible}
              disable={isGameOver}
              onClick={toggleKeyboard}
            />
          </Footer>
        </Container>
      ) : (
        <Container>
          <Error>
            Esse modo de jogo está indisponível no momento! Tente novamente mais
            tarde
          </Error>
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { length } = query;

    const words = await getRandomPracticeWord({
      wordLength: (length as string) ?? 5,
      sampleSize: 1,
    });

    return {
      props: {
        words,
      },
    };
  } catch {
    return {
      props: {
        words: [],
      },
    };
  }
};

export default Game;
