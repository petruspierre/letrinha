import { GameActions, ActionTypes } from "./types";
import { IGameState } from "~/model/SimpleGame";

export const gameReducer = (state: IGameState, action: GameActions) => {
  switch (action.type) {
    case ActionTypes.NewGuess: {
      return {
        ...state,
        attempts: state.attempts - 1,
        guesses: [...state.guesses, []],
      };
    }
    case ActionTypes.UpdateGame: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionTypes.AppendLetter: {
      const { guessId, letter } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      const guessLength = guess.length;

      if (guessLength >= state.wordLength) {
        return state;
      }

      const newLetter = {
        letter: letter.toLowerCase(),
        exists: false,
        correctPlace: false,
      };

      newGuesses[guessId] = [...guess, newLetter];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.PopLetter: {
      const { guessId } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      const guessLength = guess.length;

      if (guessLength <= 0) {
        return state;
      }

      newGuesses[guessId] = [...guess.slice(0, guessLength - 1)];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.UpdateGuesses: {
      const { guessId, guesses } = action.payload;
      const guess = state.guesses[guessId];

      if (!guess) throw new Error("guess not found");

      const newGuesses = [...state.guesses];
      newGuesses[guessId] = guesses;

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case ActionTypes.UpdateKeyboard: {
      const { guesses, keyBoardState } = state;
      const newKeyboardState = { ...keyBoardState };

      guesses.forEach((guess) => {
        guess.forEach((letterItem) => {
          const { letter } = letterItem;
          const existingLetter = newKeyboardState[letter];

          if (existingLetter) {
            newKeyboardState[letter] = {
              exists: existingLetter.exists || letterItem.exists,
              correctPlace:
                existingLetter.correctPlace || letterItem.correctPlace,
              used: true,
              letter: letterItem.letter,
            };
          } else {
            newKeyboardState[letter] = {
              ...letterItem,
              used: true,
            };
          }
        });
      });

      return {
        ...state,
        keyBoardState: newKeyboardState,
      };
    }
  }
};
