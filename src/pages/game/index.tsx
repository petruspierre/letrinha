import { useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";

import { getDailyWord, getWordList } from "~/services/words";
import { SimpleGame } from "~/components";

import { Container, Content } from "./styles";

interface GameProps {
  dailyWord: string;
}

const Game = ({ dailyWord }: GameProps) => {
  const wordListQuery = useQuery<string[]>("wordList", () =>
    getWordList(dailyWord.length)
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
        <SimpleGame wordList={wordListQuery.data} dailyWord={dailyWord} />
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
