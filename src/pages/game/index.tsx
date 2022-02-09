import Head from "next/head";
import { GetServerSideProps } from "next";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

import { useTheme } from "~/styles/theme";
import SimpleGame from "~/components/SimpleGame";
import { getDailyWord } from "~/services/words";
import { Container, Content, Header } from "./styles";
import { useState } from "react";
import HowToPlay from "~/components/HowToPlay";

import "react-toastify/dist/ReactToastify.min.css";

interface GameProps {
  dailyWord: string;
}

const Game = ({ dailyWord }: GameProps) => {
  const { showThemeSelection } = useTheme();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const toggleInstructions = () => {
    setShowHowToPlay(!showHowToPlay);
  };

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
          <SimpleGame dailyWord={dailyWord} />
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
