import { NextApiResponse, NextApiRequest } from "next";

const ResponseMock = {
  "2022-02-08": {
    word: "papel",
  },
  "2022-02-09": {
    word: "numero",
  },
  "2022-02-10": {
    word: "nausea",
  },
};

export default function DailyWord(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(ResponseMock);
}
