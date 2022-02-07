import { NextApiResponse, NextApiRequest } from "next";

export default function DailyWord(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ word: "origem" });
}
