import { NextApiResponse, NextApiRequest } from "next";
import { getDatabase, ref, child, get } from "firebase/database";

import firebase from "~/services/firebase";

const dbRef = ref(getDatabase(firebase));

export default async function WordList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wordLength } = req.query;

  const wordData = await get(child(dbRef, `word-list/${wordLength}`));

  if (wordData.exists()) {
    return res.status(200).json(wordData.val());
  } else {
    return res.status(404).json({ error: "no data found" });
  }
}
