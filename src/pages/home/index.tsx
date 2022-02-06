import Head from "next/head";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";

import { useTheme } from "~/styles/theme";
import { Container, Content, Header } from "./styles";
import SimpleGame from "./SimpleGame";

const Home = () => {
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
          <SimpleGame />
        </Content>
      </Container>
    </>
  );
};

export default Home;
