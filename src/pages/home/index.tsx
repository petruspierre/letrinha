import Head from "next/head";
import { FaPalette, FaQuestionCircle } from "react-icons/fa";

import { Container, Content, Header } from "./styles";

const Home = () => {
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
            <button>
              <FaPalette size="1.5rem" />
            </button>
          </Header>
        </Content>
      </Container>
    </>
  );
};

export default Home;
