import Head from "next/head";
import { GetServerSideProps } from "next";

import { getRandomPracticeWord } from "~/services/practice";

import { Container, Footer, GameFrame, Title } from "./styles";
import { Canva, Keyboard } from "~/components";
import usePracticeGame from "~/store/modules/practiceGame";
import { useEffect } from "react";
import { useToggle } from "~/hooks/useToogle";
import useSettings from "~/store/modules/settings";

interface PracticeProps {
  words: {
    word: string;
  }[];
}

const Game = ({ words }: PracticeProps) => {
  const {
    practiceGame,
    onAppendLetter,
    onPopLetter,
    onSubmitGuess,
    newGame,
    selectLetter,
  } = usePracticeGame();
  const { settings } = useSettings();

  const { value: keyboardVisible, toggle: toggleKeyboard } = useToggle(
    !settings.keyboardHidden
  );

  useEffect(() => {
    newGame(words[0].word, 6);
  }, [newGame, words]);

  return (
    <>
      <Head>
        <title>Modo treino | Letrinha</title>
      </Head>
      {practiceGame.word && (
        <Container>
          <Title>Modo treino</Title>
          <GameFrame>
            {words.map(({ word }, index) => {
              const {
                wordLength,
                attempts,
                selectedGuessIndex,
                selectedLetterIndex,
                guesses,
              } = practiceGame;

              return (
                <Canva
                  wordLength={wordLength}
                  attempts={attempts}
                  selectedGuess={selectedGuessIndex}
                  selectedLetter={selectedLetterIndex}
                  onLetterClick={(letter) => selectLetter(letter)}
                  guesses={guesses}
                  index={index}
                  key={word}
                />
              );
            })}
          </GameFrame>
          <Footer>
            <Keyboard
              addLetter={onAppendLetter}
              popLetter={onPopLetter}
              submit={onSubmitGuess}
              state={practiceGame.keyboard}
              isVisible={keyboardVisible}
              disable={false}
              onClick={toggleKeyboard}
            />
          </Footer>
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
};

export default Game;
