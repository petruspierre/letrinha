import { ICurrent, IHistory } from "./types";

export function updateCurrentStatistcs(current: Partial<ICurrent>) {
  return {
    type: "UPDATE_CURRENT_STATISTICS",
    payload: {
      current,
    },
  };
}

export function updateHistoryStatistcs(history: IHistory) {
  return {
    type: "UPDATE_HISTORY_STATISTICS",
    payload: {
      history,
    },
  };
}
