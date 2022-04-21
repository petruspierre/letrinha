import axios from "axios";

interface IRandomPracticeWordResponse {
  data: {
    word: string;
  }[];
}

interface IRandomPracticeWordParams {
  wordLength?: number | string;
  sampleSize?: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LETRINHA_API_BASE_URL,
});

const getRandomPracticeWord = async ({
  wordLength = 5,
  sampleSize = 1,
}: IRandomPracticeWordParams) => {
  try {
    const params = {
      wordLength,
      sampleSize,
    };

    const response = (await api.get("/practice/random", {
      params,
    })) as IRandomPracticeWordResponse;

    return response.data;
  } catch (err) {
    throw new Error("Error trying to pull practice words. " + err);
  }
};

export { getRandomPracticeWord };
