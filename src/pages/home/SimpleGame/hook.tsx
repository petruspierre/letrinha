import { useCallback, useEffect, useReducer } from "react";

import { IGameState, ActionTypes } from "./types";
import { gameReducer } from "./reducer";

const CODE_INPUTS_QTY = 6;
const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const INITIAL_STATE = {
  attempts: 6,
  isGameOver: false,
  guesses: [[]],
  wordLength: 6,
};

const useGame = () => {
  const [gameState, dispatchGame] = useReducer(gameReducer, INITIAL_STATE);

  const submitGuess = useCallback(() => {
    //check validity
    const lastGuess = gameState.guesses[gameState.guesses.length - 1];
    if (lastGuess.length !== gameState.wordLength) {
      return;
    }

    //check if word is correct
    const isWordCorrect = false;

    if (!isWordCorrect) {
      if (gameState.attempts > 1) {
        dispatchGame({ type: ActionTypes.NewGuess });
      } else {
        //game over
      }
    }
  }, [gameState]);

  const popLetter = (guessId: number) =>
    dispatchGame({
      type: ActionTypes.PopLetter,
      payload: {
        guessId,
      },
    });

  const appendLetter = (letter: string, guessId: number) =>
    dispatchGame({
      type: ActionTypes.AppendLetter,
      payload: {
        letter,
        guessId,
      },
    });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentGuess = gameState.guesses.length - 1;

      if (event.key === "Backspace") {
        popLetter(currentGuess);
        return;
      }

      if (event.key === "Enter") {
        submitGuess();
        return;
      }

      if (LETTERS.includes(event.key)) {
        appendLetter(event.key, currentGuess);
      }
    },
    [gameState, submitGuess]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    state: gameState,
  };
};

export default useGame;
