import { useCallback, useEffect, useReducer, useState } from "react";
import { endOfToday, isAfter, intervalToDuration } from "date-fns";

import { ActionTypes } from "./types";
import { gameReducer } from "./reducer";
import wordData from "~/wordData/pt-br/wordData";
import { IGuess } from "~/model/SimpleGame";
import {
  getStoragedGameState,
  setStoragedGameState,
} from "~/repositories/GameState";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const WORD_LENGTH = 6;

const INITIAL_STATE = {
  attempts: WORD_LENGTH + 1,
  isGameOver: false,
  guesses: [new Array(WORD_LENGTH).fill({})],
  wordLength: WORD_LENGTH,
  keyBoardState: {},
  gameStart: new Date(),
  gameExpires: endOfToday(),
  word: "",
};

const useGame = (dailyWord: string) => {
  const [gameState, dispatchGame] = useReducer(gameReducer, {
    ...INITIAL_STATE,
    word: dailyWord,
    gameStart: new Date(),
    wordLength: dailyWord.length,
    attempts: dailyWord.length + 1,
    guesses: [new Array(dailyWord.length).fill({})],
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getStatistics = useCallback(() => {
    const { attempts, guesses, wordLength, gameStart } = gameState;

    const totalGuesses = wordLength + 2 - attempts;
    const totalTimeSpent = intervalToDuration({
      start: new Date(gameStart),
      end: new Date(),
    });
    const totalCorrect = guesses.reduce((acc, cur) => {
      return (
        acc +
        cur.reduce((_acc, _cur) => {
          return _acc + (_cur.correctPlace ? 1 : 0);
        }, 0)
      );
    }, 0);
    const accuracy = (totalCorrect / (totalGuesses * wordLength)) * 100;

    return {
      totalGuesses,
      totalCorrect,
      totalTimeSpent,
      accuracy,
      correctWord: dailyWord,
    };
  }, [gameState, dailyWord]);

  const endGame = useCallback(
    (win: boolean) => {
      dispatchGame({
        type: ActionTypes.UpdateGame,
        payload: {
          isGameOver: true,
          attempts: win ? gameState.attempts : 0,
          win,
        },
      });
    },
    [gameState]
  );

  const submitGuess = useCallback(() => {
    const lastGuess = gameState.guesses[gameState.guesses.length - 1];
    if (
      lastGuess.filter((item) => item.letter).length !== gameState.wordLength
    ) {
      return;
    }

    const lastGuessWord = lastGuess.map((item) => item.letter).join("");

    if (!wordData[gameState.wordLength].includes(lastGuessWord)) {
      return;
    }

    const repeatedLetters = {};
    const newGuess = lastGuess.reduce((acc, cur, index) => {
      const newLetter = { ...cur };

      if (dailyWord.includes(cur.letter)) {
        const alreadyRepeated = repeatedLetters[cur.letter];

        if (alreadyRepeated) {
          if (
            alreadyRepeated <
            dailyWord.match(new RegExp(`${cur.letter}`, "g")).length
          ) {
            repeatedLetters[cur.letter] = alreadyRepeated + 1;

            newLetter.exists = true;
          } else {
            const otherLetter = acc.find(
              (query) => query.letter === cur.letter && query.exists === true
            );
            const queryId = acc.indexOf(otherLetter);
            if (queryId) {
              acc[queryId] = { ...acc[queryId], exists: false };
            }
          }
        } else {
          repeatedLetters[cur.letter] = 1;
          newLetter.exists = true;
        }

        if (dailyWord[index] === cur.letter) {
          newLetter.correctPlace = true;
        }
      }

      return [...acc, newLetter];
    }, [] as IGuess);

    dispatchGame({
      type: ActionTypes.UpdateGuesses,
      payload: {
        guessId: gameState.guesses.length - 1,
        guesses: newGuess,
      },
    });

    dispatchGame({
      type: ActionTypes.UpdateKeyboard,
    });

    setSelectedIndex(0);

    const isWordCorrect = newGuess.every((item) => item.correctPlace);

    if (!isWordCorrect) {
      if (gameState.attempts > 1) {
        dispatchGame({ type: ActionTypes.NewGuess });
      } else {
        endGame(false);
      }
    } else {
      endGame(true);
    }
  }, [dailyWord, gameState, endGame]);

  const popLetter = useCallback(() => {
    const lastGuess = gameState.guesses.length - 1;
    dispatchGame({
      type: ActionTypes.PopLetter,
      payload: {
        guessId: lastGuess,
        letterId: selectedIndex,
      },
    });

    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [gameState, selectedIndex]);

  const appendLetter = useCallback(
    (letter: string) => {
      const lastGuess = gameState.guesses.length - 1;
      dispatchGame({
        type: ActionTypes.AppendLetter,
        payload: {
          letter,
          guessId: lastGuess,
          letterId: selectedIndex,
        },
      });

      if (selectedIndex < gameState.wordLength - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    },
    [gameState, selectedIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      if (event.key === "Backspace") {
        popLetter();
        return;
      }

      if (event.key === "Enter") {
        submitGuess();
        return;
      }

      if (event.key === "ArrowLeft") {
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        return;
      }

      if (event.key === "ArrowRight") {
        if (selectedIndex < gameState.wordLength - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
        return;
      }

      if (LETTERS.includes(event.key)) {
        appendLetter(event.key);
      }
    },
    [submitGuess, appendLetter, popLetter, selectedIndex, gameState]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState.attempts !== gameState.wordLength + 1) {
      setStoragedGameState(gameState);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.isGameOver && !gameState.statistics) {
      const statistics = getStatistics();

      dispatchGame({
        type: ActionTypes.UpdateGame,
        payload: {
          statistics,
        },
      });
    }
  }, [gameState, getStatistics]);

  useEffect(() => {
    const state = getStoragedGameState();

    if (state) {
      if (!state.word || state.word !== dailyWord) return;

      const lastGuess = state.guesses[state.guesses.length - 1];
      const lastIndex = lastGuess.filter((item) => item.letter).length;

      setSelectedIndex(
        lastIndex >= state.wordLength ? state.wordLength - 1 : lastIndex
      );

      dispatchGame({
        type: ActionTypes.UpdateGame,
        payload: state,
      });
    }
  }, [dailyWord]);

  return {
    state: gameState,
    isLoading: !dailyWord,
    submitGuess,
    popLetter,
    appendLetter,
    selectedIndex,
    setSelectedIndex,
  };
};

export default useGame;
