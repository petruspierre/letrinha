import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useSound from "use-sound";

import { practiceGameSelector } from "../../selectors";
import useSettings from "../settings";

import {
  changeSelectedIndex,
  updateGame,
  updateGuesses,
  updateKeyboard,
  pushNewGuess,
  popLetter,
  appendLetter,
} from "./actions";
import { IPracticeGuess } from "./types";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const usePracticeGame = () => {
  const practiceGame = useSelector(practiceGameSelector);
  const dispatch = useDispatch();

  const { settings } = useSettings();
  const volume = settings.volume.soundEffects;

  const [playType] = useSound("/assets/sound/type.mp3", { volume });
  const [playSubmit] = useSound("/assets/sound/submit.mp3", { volume });
  const [playErase] = useSound("/assets/sound/erase.mp3", { volume });

  const endGame = useCallback(
    (win: boolean) => {
      dispatch(
        updateGame({
          isGameOver: true,
          attempts: win ? practiceGame.attempts : 0,
          win,
        })
      );
    },
    [dispatch, practiceGame]
  );

  const onSubmitGuess = useCallback(() => {
    playSubmit();

    try {
      const { guesses, selectedGuessIndex, wordLength, word } = practiceGame;

      const selectedGuess = guesses[selectedGuessIndex];
      if (selectedGuess.filter((item) => item.letter).length !== wordLength) {
        return;
      }

      const repeatedLetters = {};
      const newGuess = selectedGuess.reduce((acc, cur, index) => {
        const newLetter = { ...cur };

        if (word.includes(cur.letter)) {
          const alreadyRepeated = repeatedLetters[cur.letter];

          if (alreadyRepeated) {
            if (
              alreadyRepeated <
              word.match(new RegExp(`${cur.letter}`, "g")).length
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

          if (word[index] === cur.letter) {
            newLetter.correctPlace = true;
          }
        }

        return [...acc, newLetter];
      }, [] as IPracticeGuess);

      dispatch(
        updateGuesses({
          guessId: selectedGuessIndex,
          guesses: newGuess,
        })
      );

      dispatch(updateKeyboard());

      dispatch(changeSelectedIndex({ letter: 0 }));

      const isWordCorrect = newGuess.every((item) => item.correctPlace);

      if (!isWordCorrect) {
        if (practiceGame.attempts > 1) {
          dispatch(changeSelectedIndex({ guess: selectedGuessIndex + 1 }));
          dispatch(pushNewGuess());
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
  }, [dispatch, practiceGame, endGame, playSubmit]);

  const onPopLetter = useCallback(() => {
    playErase();

    try {
      const { selectedGuessIndex, selectedLetterIndex, guesses } = practiceGame;

      dispatch(
        popLetter({
          guessId: selectedGuessIndex,
          letterId: selectedLetterIndex,
        })
      );

      const selectedLetter =
        guesses[selectedGuessIndex][selectedLetterIndex]?.letter;

      if (!selectedLetter) {
        if (selectedLetterIndex > 0) {
          const newIndex = selectedLetterIndex - 1;
          dispatch(changeSelectedIndex({ letter: newIndex }));

          dispatch(
            popLetter({
              guessId: selectedGuessIndex,
              letterId: newIndex,
            })
          );
        }
      }
    } catch (err) {
      toast("Erro ao apagar a letra. Tente novamente", {
        type: toast.TYPE.ERROR,
      });
    }
  }, [dispatch, practiceGame, playErase]);

  const onAppendLetter = useCallback(
    (letter: string) => {
      playType();

      try {
        const { selectedGuessIndex, selectedLetterIndex, wordLength } =
          practiceGame;

        dispatch(
          appendLetter({
            letter,
            guessId: selectedGuessIndex,
            letterId: selectedLetterIndex,
          })
        );

        if (selectedLetterIndex < wordLength) {
          dispatch(changeSelectedIndex({ letter: selectedLetterIndex + 1 }));
        }
      } catch {
        toast("Erro ao inserir a letra. Tente novamente", {
          type: toast.TYPE.ERROR,
        });
      }
    },
    [dispatch, practiceGame, playType]
  );

  const newGame = useCallback(
    (word: string, attempts: number) => {
      dispatch(
        updateGame({
          word,
          attempts,
          wordLength: word.length,
          guesses: new Array(word.length + 1).fill(
            new Array(word.length).fill({})
          ),
          selectedGuessIndex: 0,
          selectedLetterIndex: 0,
          keyboard: {},
          isGameOver: false,
          win: false,
        })
      );
    },
    [dispatch]
  );

  const selectLetter = useCallback(
    (letter: number) => {
      dispatch(
        changeSelectedIndex({
          letter,
        })
      );
    },
    [dispatch]
  );

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      const {
        isGameOver,
        selectedGuessIndex,
        selectedLetterIndex,
        wordLength,
      } = practiceGame;

      if (isGameOver) return;

      if (key === "Backspace") {
        onPopLetter();
        return;
      }

      if (key === "Enter") {
        onSubmitGuess();
        return;
      }

      if (key === "ArrowLeft") {
        playErase();
        if (selectedLetterIndex > 0) {
          dispatch(changeSelectedIndex({ letter: selectedLetterIndex - 1 }));
        }
        return;
      }

      if (key === "ArrowRight") {
        playErase();
        if (selectedLetterIndex < wordLength - 1) {
          dispatch(changeSelectedIndex({ letter: selectedLetterIndex + 1 }));
        }
        return;
      }

      if (LETTERS.includes(key)) {
        onAppendLetter(key);
      }
    },
    [
      dispatch,
      onSubmitGuess,
      onAppendLetter,
      onPopLetter,
      practiceGame,
      playErase,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    practiceGame,
    onSubmitGuess,
    onPopLetter,
    onAppendLetter,
    newGame,
    selectLetter,
  };
};

export default usePracticeGame;
