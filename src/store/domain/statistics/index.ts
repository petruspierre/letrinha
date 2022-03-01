import { intervalToDuration } from "date-fns";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGameState } from "~/model/SimpleGame";
import { setStoragedStatistics } from "~/store/infra/repositories/StatisticsRepository";
import * as duration from "duration-fns";

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

  const calculateHistoryStatistics = useCallback(
    (gameState: IGameState, dailyWord: string) => {
      const { current, history } = statistics;
      const { win } = gameState;

      if (current) {
        const totalGuesses = history.totalGuesses + current.totalGuesses;
        const totalCorrect = history.totalCorrect + current.totalCorrect;
        const totalLetters =
          history.totalLetters + current.totalGuesses * dailyWord.length;

        const payload = {
          currentStreak: win ? history.currentStreak + 1 : 0,
          longestStreak: win
            ? history.longestStreak + 1
            : history.longestStreak,
          totalGames: history.totalGames + 1,
          totalVictories: win
            ? history.totalVictories + 1
            : history.totalVictories,
          numberOfTries: {
            ...history.numberOfTries,
            [current.totalGuesses.toString()]: win
              ? history.numberOfTries[current.totalGuesses.toString()] + 1
              : history.numberOfTries[current.totalGuesses.toString()],
          },
          lastWord: dailyWord,
          totalTimeSpent:
            duration.toSeconds(current.totalTimeSpent) + history.totalTimeSpent,
          averageAccuracy: (totalCorrect / totalLetters) * 100,
          totalGuesses,
          totalCorrect,
          totalLetters,
        };

        dispatch(updateHistoryStatistcs(payload));
      }
    },
    [statistics, dispatch]
  );

  useEffect(() => {
    if (statistics) {
      setStoragedStatistics(statistics);
    }
  }, [statistics]);

  return {
    statistics,
    calculateCurrentStatistics,
    calculateHistoryStatistics,
  };
};

export default useStatistics;
