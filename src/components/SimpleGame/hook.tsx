import { useCallback, useEffect, useReducer, useState } from "react";

import { ActionTypes } from "./types";
import { gameReducer } from "./reducer";
import wordData from "~/wordData/pt-br/wordData";
import api from "~/services/api";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const INITIAL_STATE = {
  attempts: 6,
  isGameOver: false,
  guesses: [[]],
  wordLength: 6,
};

const useGame = (dailyWord: string) => {
  const [gameState, dispatchGame] = useReducer(gameReducer, INITIAL_STATE);

  const submitGuess = useCallback(() => {
    const lastGuess = gameState.guesses[gameState.guesses.length - 1];
    if (lastGuess.length !== gameState.wordLength) {
      return;
    }

    const lastGuessWord = lastGuess.map((item) => item.letter).join("");

    if (!wordData[gameState.wordLength].includes(lastGuessWord)) {
      return;
    }

    const repeatedLetters = {};
    const newGuess = lastGuess.map((item, index) => {
      const newLetter = { ...item };

      if (dailyWord.includes(item.letter)) {
        const alreadyRepeated = repeatedLetters[item.letter];

        if (alreadyRepeated) {
          if (
            alreadyRepeated <
            dailyWord.match(new RegExp(`${item.letter}`, "g")).length
          ) {
            repeatedLetters[item.letter] = alreadyRepeated + 1;

            newLetter.exists = true;
          }
        } else {
          repeatedLetters[item.letter] = 1;
          newLetter.exists = true;
        }

        if (dailyWord[index] === item.letter) {
          newLetter.correctPlace = true;
        }
      }

      return newLetter;
    });

    dispatchGame({
      type: ActionTypes.UpdateGuesses,
      payload: {
        guessId: gameState.guesses.length - 1,
        guesses: newGuess,
      },
    });

    const isWordCorrect = newGuess.every((item) => item.correctPlace);

    if (!isWordCorrect) {
      if (gameState.attempts > 1) {
        dispatchGame({ type: ActionTypes.NewGuess });
      } else {
        alert("perdeu");
      }
    } else {
      alert("ganhou");
    }
  }, [dailyWord, gameState]);

  const popLetter = useCallback(() => {
    const lastGuess = gameState.guesses.length - 1;
    dispatchGame({
      type: ActionTypes.PopLetter,
      payload: {
        guessId: lastGuess,
      },
    });
  }, [gameState]);

  const appendLetter = useCallback(
    (letter: string) => {
      const lastGuess = gameState.guesses.length - 1;
      dispatchGame({
        type: ActionTypes.AppendLetter,
        payload: {
          letter,
          guessId: lastGuess,
        },
      });
    },
    [gameState]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentGuess = gameState.guesses.length - 1;

      if (event.key === "Backspace") {
        popLetter();
        return;
      }

      if (event.key === "Enter") {
        submitGuess();
        return;
      }

      if (LETTERS.includes(event.key)) {
        appendLetter(event.key);
      }
    },
    [gameState, submitGuess, appendLetter, popLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    state: gameState,
    isLoading: !dailyWord,
    submitGuess,
    popLetter,
    appendLetter,
  };
};

export default useGame;
