import { intervalToDuration } from "date-fns";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGameState } from "~/model/SimpleGame";

import { statisticsSelector } from "../../selectors";
import { updateCurrentStatistcs, updateHistoryStatistcs } from "./actions";

const useStatistics = () => {
  const statistics = useSelector(statisticsSelector);
  const dispatch = useDispatch();

  const calculateCurrentStatistics = useCallback(
    (gameState: IGameState, dailyWord: string) => {
      const { attempts, guesses, wordLength, gameStart, win } = gameState;

      const totalGuesses = win ? wordLength + 2 - attempts : wordLength + 1;
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

      const payload = {
        totalGuesses,
        totalCorrect,
        totalTimeSpent,
        accuracy,
        correctWord: dailyWord,
      };

      dispatch(updateCurrentStatistcs(payload));
    },
    [dispatch]
  );

  return {
    statistics,
    calculateCurrentStatistics,
  };
};

export default useStatistics;
