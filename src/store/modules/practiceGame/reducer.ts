import { Reducer } from "redux";

import { IPracticeGameState } from "./types";

const WORD_LENGTH = 6;

const INITIAL_STATE: IPracticeGameState = {
  attempts: WORD_LENGTH + 2,
  isGameOver: false,
  guesses: [],
  keyboard: {},
  word: "",
  wordLength: WORD_LENGTH,
  selectedGuessIndex: 0,
  selectedLetterIndex: 0,
  wordList: [],
};

const practiceGameReducer: Reducer<IPracticeGameState> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "PRACTICE_GAME_NEW_GUESS": {
      return {
        ...state,
        attempts: state.attempts - 1,
      };
    }
    case "PRACTICE_GAME_UPDATE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "PRACTICE_GAME_APPEND_LETTER": {
      const { guessId, letter, letterId } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      if (letterId >= state.wordLength) return state;

      const newLetter = {
        letter: letter.toLowerCase(),
        exists: false,
        correctPlace: false,
      };

      const newGuess = [...guess];
      newGuess[letterId] = newLetter;
      newGuesses[guessId] = [...newGuess];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case "PRACTICE_GAME_POP_LETTER": {
      const { guessId, letterId } = action.payload;
      const newGuesses = [...state.guesses];
      const guess = newGuesses[guessId];

      if (!guess) throw new Error("guess not found");

      if (letterId >= state.wordLength) return state;

      const newGuess = [...guess] as any[];
      newGuess[letterId] = {};
      newGuesses[guessId] = [...newGuess];

      return {
        ...state,
        guesses: newGuesses,
      };
    }
    case "PRACTICE_GAME_UPDATE_GUESSES": {
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
    case "PRACTICE_GAME_UPDATE_KEYBOARD": {
      const { guesses, keyboard } = state;
      const newKeyboardState = { ...keyboard };

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
        keyboard: newKeyboardState,
      };
    }
    case "PRACTICE_GAME_CHANGE_SELECTED_INDEX": {
      const { guess, letter } = action.payload;

      return {
        ...state,
        selectedGuessIndex: guess ?? state.selectedGuessIndex,
        selectedLetterIndex: letter ?? state.selectedLetterIndex,
      };
    }
    default: {
      return state;
    }
  }
};

export default practiceGameReducer;
