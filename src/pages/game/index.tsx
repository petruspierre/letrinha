import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { getDailyWord, getWordList } from "~/services/words";
import { SimpleGame } from "~/components";

import { Container } from "./styles";
import { decrypt } from "~/utils/crypt";

interface GameProps {
  dailyWord: { iv: string; content: string };
}

const Game = ({ dailyWord }: GameProps) => {
  const decryptedWord = decrypt(dailyWord);

  const wordListQuery = useQuery<string[]>("wordList", () =>
    getWordList(decryptedWord.length)
  );

  useEffect(() => {
    if (wordListQuery.isFetched) {
      if (wordListQuery.isError) {
        toast(
          "Não foi possível carregar banco de palavras, por favor reinicie a página e tente novamente",
          { type: toast.TYPE.ERROR }
        );
      }
    }
  }, [wordListQuery]);

  return (
    <>
      <Head>
        <title>Palavra do dia | Letrinha</title>
      </Head>
      <Container>
        <SimpleGame wordList={wordListQuery.data} dailyWord={decryptedWord} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const word = await getDailyWord();

  return {
    props: {
      dailyWord: word,
    },
  };
};

export default Game;
