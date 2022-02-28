import Modal from "../Modal";
import { Container, Preview, PreviewWrapper } from "./styles";

interface IHowToPlayProps {
  dismiss: () => void;
}

const HowToPlay = ({ dismiss }: IHowToPlayProps) => {
  return (
    <Modal dismiss={dismiss} title="Como jogar?">
      <Container>
        <p>
          No letrinha, o seu objetivo é : acertar a palavra. E já que você não
          tem uma bola de cristal , vai ter que ser de <span>letrinha</span> por{" "}
          <span>letrinha</span> mesmo. Você fará isso através de dicas, que são
          dadas por cores. São as situações abaixo:
        </p>
        <p>letra “A” NÃO está na pálavra:</p>
        <PreviewWrapper>
          <Preview>A</Preview>
        </PreviewWrapper>
        <p>letra “A” na palavra, mas em outra posição:</p>
        <PreviewWrapper>
          <Preview>Q</Preview>
          <Preview>U</Preview>
          <Preview exists>A</Preview>
          <Preview>S</Preview>
          <Preview>E</Preview>
        </PreviewWrapper>
        <p>letra “A” na palavra e perfeitamente posicionada:</p>
        <PreviewWrapper>
          <Preview>S</Preview>
          <Preview correctPlace>A</Preview>
          <Preview>B</Preview>
          <Preview>E</Preview>
          <Preview>R</Preview>
        </PreviewWrapper>
        <p>
          No modo palavra do dia (a palavra muda 24h após a última troca), você
          terá que acertar a palávra aleatória do dia, com um limite de
          tentativas. Acerte todas as letras nas posições corretas e ganhe o
          jogo. Lembrando: Serão consiferadas apenas palavras do{" "}
          <span>dicionário</span>. Nada de inventar ein!!!
        </p>
      </Container>
    </Modal>
  );
};

export default HowToPlay;
