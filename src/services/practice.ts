import axios from "axios";

interface IRandomPracticeWordResponse {
  data: {
    word: string;
  }[];
}

interface IRandomPracticeWordParams {
  wordLength: number | string;
  sampleSize: number;
}

const api = axios.create({
  baseURL: process.env.LETRINHA_API_BASE_URL,
});

const getRandomPracticeWord = async ({
  wordLength,
  sampleSize,
}: IRandomPracticeWordParams) => {
  try {
    const data = {
      wordLength,
      sampleSize,
    };

    const reponse = (await api.get("/practice/random", {
      data,
    })) as IRandomPracticeWordResponse;

    return reponse.data;
  } catch (err) {
    throw new Error("Error trying to pull practice words. " + err);
  }
};

export { getRandomPracticeWord };
