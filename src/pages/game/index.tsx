import Head from "next/head";
import { GetServerSideProps } from "next";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";

import { useTheme } from "~/styles/theme";
import SimpleGame from "~/components/SimpleGame";
import { getDailyWord, getWordList } from "~/services/words";
import { Container, Content, Header } from "./styles";
import { useEffect, useState } from "react";
import HowToPlay from "~/components/HowToPlay";

import "react-toastify/dist/ReactToastify.min.css";

interface GameProps {
  dailyWord: string;
}

const Game = ({ dailyWord }: GameProps) => {
  const { showThemeSelection } = useTheme();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const wordListQuery = useQuery<string[]>("wordList", () =>
    getWordList(dailyWord.length)
  );

  const toggleInstructions = () => {
    setShowHowToPlay(!showHowToPlay);
  };

  useEffect(() => {
    console.log("teste");
    if (wordListQuery.isFetched) {
      console.log("teste 2");
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
        <title>Letrinha</title>
      </Head>
      <Container>
        {showHowToPlay && <HowToPlay dismiss={toggleInstructions} />}
        <Content>
          <Header>
            <button
              onClick={toggleInstructions}
              aria-label="Como jogar?"
              title="Como jogar?"
            >
              <FaQuestionCircle size="1.5rem" />
            </button>
            <h1>Letrinha</h1>
            <button
              onClick={showThemeSelection}
              aria-label="Mudar tema"
              title="Mudar tema"
            >
              <FaPalette size="1.5rem" />
            </button>
          </Header>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            className="toast"
            draggable
            pauseOnHover
          />
          <SimpleGame wordList={wordListQuery.data} dailyWord={dailyWord} />
        </Content>
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
