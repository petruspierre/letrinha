import Head from "next/head";
import { GetServerSideProps } from "next";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { startOfDay, format } from "date-fns";

import { useTheme } from "~/styles/theme";
import SimpleGame from "~/components/SimpleGame";
import api from "~/services/api";
import { Container, Content, Header } from "./styles";
import { useState } from "react";
import HowToPlay from "~/components/HowToPlay";

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
          <SimpleGame dailyWord={dailyWord} />
        </Content>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get("/daily-word");

  const today = format(startOfDay(new Date()), "yyyy-MM-dd");
  const word = response.data[today].word;

  return {
    props: {
      dailyWord: word,
    },
  };
};

export default Game;
