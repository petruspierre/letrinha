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
  Preview,
  PreviewWrapper,
  Result,
  Title,
} from "./styles";
import { Canva, Keyboard, Loading } from "~/components";
import usePracticeGame from "~/store/modules/practiceGame";
import { useEffect, useState } from "react";
import { useToggle } from "~/hooks/useToogle";
import useSettings from "~/store/modules/settings";
import Modal from "~/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getWordList } from "~/services/words";

type PracticeWordResponse = Array<{
  word: string;
}>;

const Game = () => {
  const [showResult, setShowResult] = useState(false);
  const [gameInitiated, setGameInitiated] = useState(false);

  const {
    query: { wordLength: queryWordLength },
  } = useRouter();

  const {
    data: words,
    isLoading: loadingPracticeWord,
    isError: errorPracticeWord,
  } = useQuery<PracticeWordResponse>(
    ["practice-word", queryWordLength],
    () =>
      getRandomPracticeWord({
        wordLength: queryWordLength as string,
      }),
    {
      cacheTime: 0,
    }
  );

  const {
    data: wordList,
    isLoading: loadingWordList,
    isError: errorWordList,
  } = useQuery<string[]>(
    `wordList-${queryWordLength}`,
    () => getWordList(parseInt(queryWordLength as string) ?? 5),
    {
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );

  const {
    practiceGame: {
      word,
      wordLength,
      selectedGuessIndex,
      selectedLetterIndex,
      guesses,
      isGameOver,
      keyboard,
      win,
    },
    onAppendLetter,
    onPopLetter,
    onSubmitGuess,
    newGame,
    selectLetter,
    handleKeyDown,
  } = usePracticeGame();

  const { settings } = useSettings();
  const router = useRouter();

  const { value: keyboardVisible, toggle: toggleKeyboard } = useToggle(
    !settings.keyboardHidden
  );

  const isLoading = loadingPracticeWord || loadingWordList;
  const isError = errorPracticeWord || errorWordList;

  useEffect(() => {
    if (!isLoading && !isError) {
      if (words.length > 0) {
        const practiceWord = words[0].word;

        newGame(practiceWord, practiceWord.length + 1, wordList);
        setGameInitiated(true);
      }
    }
  }, [isLoading, isError, newGame, words, wordList]);

  useEffect(() => {
    if (isGameOver && gameInitiated) {
      setShowResult(true);
    }
  }, [isGameOver, gameInitiated]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Modo treino | Letrinha</title>
        </Head>
        <Container>
          <Loading message="Carregando palavra..." />
        </Container>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Head>
          <title>Modo treino | Letrinha</title>
        </Head>
        <Container>
          <Error>
            Não foi possível carregar esse modo de jogo. Tente novamente mais
            tarde.
          </Error>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Modo treino | Letrinha</title>
      </Head>
      {showResult && (
        <Modal dismiss={() => setShowResult(false)} title="Treino finalizado!">
          <Result>
            <p>Você {win ? "venceu!" : "perdeu."}</p>

            <PreviewWrapper>
              {word.split("").map((letter, index) => (
                <Preview
                  exists={keyboard[letter]?.exists}
                  correctPlace={keyboard[letter]?.correctPlace}
                  key={`${letter}-${index}`}
                >
                  {letter.toUpperCase()}
                </Preview>
              ))}
            </PreviewWrapper>

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
      <Container>
        {/* <Title>Modo treino</Title> */}
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
    </>
  );
};

export default Game;
