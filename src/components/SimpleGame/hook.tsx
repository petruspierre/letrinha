import { useCallback, useEffect, useReducer, useState } from "react";
import { endOfToday } from "date-fns";
import { toast } from "react-toastify";
import useSound from "use-sound";

import { ActionTypes } from "./types";
import { gameReducer } from "./reducer";

import { IGuess } from "~/model/SimpleGame";
import {
  getStoragedGameState,
  setStoragedGameState,
} from "~/repositories/GameState";
import useSettings from "~/store/modules/settings";
import useStatistics from "~/store/modules/statistics";

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

interface ISimpleGameHookProps {
  dailyWord: string;
  wordList: string[];
}

const useGame = ({ dailyWord, wordList }: ISimpleGameHookProps) => {
  const { settings } = useSettings();
  const { calculateCurrentStatistics, calculateHistoryStatistics, statistics } =
    useStatistics();
  const [gameState, dispatchGame] = useReducer(gameReducer, {
    ...INITIAL_STATE,
    word: dailyWord,
    gameStart: new Date(),
    wordLength: dailyWord.length,
    attempts: dailyWord.length + 1,
    guesses: new Array(dailyWord.length + 1).fill(
      new Array(dailyWord.length).fill({})
    ),
  });
  const [playType] = useSound("/assets/sound/type.mp3", {
    volume: settings.volume.soundEffects,
  });
  const [playSubmit] = useSound("/assets/sound/submit.mp3", {
    volume: settings.volume.soundEffects,
  });
  const [playErase] = useSound("/assets/sound/erase.mp3", {
    volume: settings.volume.soundEffects,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(0);

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
    playSubmit();
    try {
      const selectedGuess = gameState.guesses[selectedGuessIndex];
      if (
        selectedGuess.filter((item) => item.letter).length !==
        gameState.wordLength
      ) {
        return;
      }

      if (wordList.length === 0) {
        toast(
          "Carregando banco de palavras, por favor aguarde e tente novamente."
        );
        return;
      }

      const selectedGuessWord = selectedGuess
        .map((item) => item.letter)
        .join("");

      if (!wordList.includes(selectedGuessWord)) {
        toast("Palavra não consta no dicionário, tente novamente.");
        return;
      }

      const repeatedLetters = {};
      const newGuess = selectedGuess.reduce((acc, cur, index) => {
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
                (query) =>
                  query.letter === cur.letter &&
                  query.correctPlace === false &&
                  query.exists === true
              );

              if (otherLetter) {
                const queryId = acc.indexOf(otherLetter);

                if (queryId !== -1) {
                  acc[queryId] = { ...acc[queryId], exists: false };

                  newLetter.exists = true;
                }
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
          guessId: selectedGuessIndex,
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
          setSelectedGuessIndex(selectedGuessIndex + 1);
          dispatchGame({ type: ActionTypes.NewGuess });
        } else {
          endGame(false);
        }
      } else {
        endGame(true);
      }
    } catch {
      toast("Erro ao enviar a palavra. Tente novamente.", {
        type: toast.TYPE.ERROR,
      });
    }
  }, [dailyWord, gameState, endGame, wordList, selectedGuessIndex, playSubmit]);

  const popLetter = useCallback(() => {
    playErase();
    try {
      dispatchGame({
        type: ActionTypes.PopLetter,
        payload: {
          guessId: selectedGuessIndex,
          letterId: selectedIndex,
        },
      });

      const selectedLetter =
        gameState.guesses[selectedGuessIndex][selectedIndex]?.letter;
      if (!selectedLetter) {
        if (selectedIndex > 0) {
          const newIndex = selectedIndex - 1;
          setSelectedIndex(newIndex);

          dispatchGame({
            type: ActionTypes.PopLetter,
            payload: {
              guessId: selectedGuessIndex,
              letterId: newIndex,
            },
          });
        }
      }
    } catch (err) {
      toast("Erro ao apagar a letra. Tente novamente", {
        type: toast.TYPE.ERROR,
      });
    }
  }, [gameState, selectedIndex, selectedGuessIndex, playErase]);

  const appendLetter = useCallback(
    (letter: string) => {
      playType();
      try {
        dispatchGame({
          type: ActionTypes.AppendLetter,
          payload: {
            letter,
            guessId: selectedGuessIndex,
            letterId: selectedIndex,
          },
        });

        if (selectedIndex < gameState.wordLength) {
          setSelectedIndex(selectedIndex + 1);
        }
      } catch {
        toast("Erro ao inserir a letra. Tente novamente", {
          type: toast.TYPE.ERROR,
        });
      }
    },
    [gameState, selectedIndex, selectedGuessIndex, playType]
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
        playErase();
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
        return;
      }

      if (event.key === "ArrowRight") {
        playErase();
        if (selectedIndex < gameState.wordLength - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
        return;
      }

      if (LETTERS.includes(event.key)) {
        appendLetter(event.key);
      }
    },
    [submitGuess, appendLetter, popLetter, selectedIndex, gameState, playErase]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const selectedGuess = gameState.guesses[selectedGuessIndex];

    if (selectedGuess) {
      if (gameState.isGameOver) {
        setStoragedGameState(gameState);
        return;
      }

      if (gameState.attempts !== gameState.wordLength + 1) {
        if (!selectedGuess.some((item) => item.letter)) {
          setStoragedGameState(gameState);
        }
      }
    }
  }, [gameState, selectedGuessIndex]);

  useEffect(() => {
    if (gameState.isGameOver) {
      calculateCurrentStatistics(gameState, dailyWord);
    }
  }, [gameState, calculateCurrentStatistics, dailyWord]);

  useEffect(() => {
    if (
      statistics.current &&
      statistics.current.correctWord !== statistics.history.lastWord
    ) {
      calculateHistoryStatistics(gameState, dailyWord);
    }
  }, [statistics, calculateHistoryStatistics, dailyWord, gameState]);

  useEffect(() => {
    try {
      const state = getStoragedGameState();

      if (state) {
        if (!state.word || state.word !== dailyWord) return;

        const lastFilledGuess = state.guesses.filter((guess) =>
          guess.some((letter) => letter.letter)
        );
        let lastGuessIndex = lastFilledGuess.length - 1;

        if (
          lastGuessIndex < state.wordLength &&
          lastFilledGuess[lastGuessIndex].every((letter) => letter.letter)
        ) {
          lastGuessIndex = lastGuessIndex + 1;
        }
        const lastGuess = state.guesses[lastGuessIndex];

        if (lastGuess) {
          const lastIndex = lastGuess.filter((item) => item.letter).length;

          setSelectedGuessIndex(lastGuessIndex);
          setSelectedIndex(
            lastIndex >= state.wordLength ? state.wordLength - 1 : lastIndex
          );

          dispatchGame({
            type: ActionTypes.UpdateGame,
            payload: state,
          });
        }
      }
    } catch {
      toast("Erro ao carregar o jogo salvo.", {
        type: toast.TYPE.ERROR,
        autoClose: 4000,
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
    selectedGuessIndex,
  };
};

export default useGame;
