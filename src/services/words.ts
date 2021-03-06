import { format } from "date-fns";
import { query as q } from "faunadb";
import { encrypt } from "~/utils/crypt";

import api from "./api";
import { fauna } from "./fauna";

const FALLBACK_WORD = "testes";

interface IDailyWordQueryResponse {
  data: {
    date: string;
    word: string;
  };
}

const getDailyWord = async () => {
  if (process.env.NODE_ENV === "development") {
    return encrypt(FALLBACK_WORD);
  }

  try {
    const now = new Date();

    const today = format(
      new Date(now.toLocaleString("en-US", { timeZone: "America/Fortaleza" })),
      "yyyy-MM-dd"
    );

    const { data } = await fauna.query<IDailyWordQueryResponse>(
      q.Get(q.Match(q.Index("word_by_date"), q.Casefold(today)))
    );

    const encryptedWord = encrypt(data.word);

    return encryptedWord ?? encrypt(FALLBACK_WORD);
  } catch (err) {
    throw new Error("Error trying to pull daily word. " + err);
  }
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
