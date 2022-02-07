import Head from "next/head";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";

import { useTheme } from "~/styles/theme";
import { Container, Content, Header } from "./styles";
import SimpleGame from "./SimpleGame";
import { GetServerSideProps } from "next";
import api from "~/services/api";

interface HomeProps {
  dailyWord: string;
}

const Home = ({ dailyWord }) => {
  const { showThemeSelection } = useTheme();

  return (
    <>
      <Head>
        <title>Letrinha</title>
      </Head>
      <Container>
        <Content>
          <Header>
            <button>
              <FaQuestionCircle size="1.5rem" />
            </button>
            <h1>Letrinha</h1>
            <button onClick={showThemeSelection}>
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

  const word = response.data.word;

  return {
    props: {
      dailyWord: word,
    },
  };
};

export default Home;
