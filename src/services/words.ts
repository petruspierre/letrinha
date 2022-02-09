import { format, formatISO } from "date-fns";

import { DailyWord } from "~/model/SimpleGame";
import api from "./api";

const getDailyWord = async () => {
  const response = await api.get<DailyWord>("word/daily-word");
  const now = new Date();

  const today = format(
    new Date(now.toLocaleString("en-US", { timeZone: "America/Fortaleza" })),
    "yyyy-MM-dd"
  );

  return response.data[today].word;
};

const getWordList = async (wordLength: number) => {
  const response = await api.get<Array<string>>("word/word-list", {
    params: {
      wordLength,
    },
  });

  return response.data;
};

export { getDailyWord, getWordList };
