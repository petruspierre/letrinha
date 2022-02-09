import { format, startOfDay } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { DailyWord } from "~/model/SimpleGame";
import api from "./api";

const getDailyWord = async () => {
  const response = await api.get<DailyWord>("word/daily-word");
  const todayUTC = startOfDay(new Date());

  const today = format(
    utcToZonedTime(todayUTC, "America/Fortaleza"),
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
