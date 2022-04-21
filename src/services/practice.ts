import axios from "axios";
import { letrinhaApi } from "./letrinhaApi";

interface IRandomPracticeWordResponse {
  data: {
    word: string;
  }[];
}

interface IRandomPracticeWordParams {
  wordLength?: number | string;
  sampleSize?: number;
}

const getRandomPracticeWord = async ({
  wordLength = 5,
  sampleSize = 1,
}: IRandomPracticeWordParams) => {
  try {
    const params = {
      wordLength,
      sampleSize,
    };

    const response = (await letrinhaApi.get("/practice/random", {
      params,
    })) as IRandomPracticeWordResponse;

    return response.data;
  } catch (err) {
    throw new Error("Error trying to pull practice words. " + err);
  }
};

export { getRandomPracticeWord };
