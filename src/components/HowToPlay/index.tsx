import Modal from "../Modal";
import { Container } from "./styles";

interface HowToPlayProps {
  dismiss: () => void;
}

const HowToPlay = ({ dismiss }: HowToPlayProps) => {
  return (
    <Modal dismiss={dismiss}>
      <Container>
        <h2>Como jogar?</h2>

        <p>
          Adivinha a palavra do dia acertando as <strong>letrinhas</strong> na
          quantidade limite de tentativas (quantidade de letras + 1)
        </p>

        <p>
          Para saber se você está quente ou frio, observe como ficarão as
          letrinhas após fazer sua tentativa:
        </p>

        <h3>
          Cor <span className="yellow">amarela</span>:
        </h3>
        <p>
          Quando sua letrinha ficar amarela, significa que ela está na palavra
          do dia, porém cuidado, ela não está no local certo!
        </p>

        <h3>
          Cor <span className="green">verde</span>:
        </h3>
        <p>
          Quando sua letrinha ficar verde, significa que a letrinha existe na
          palavra e já está no lugar certo!
        </p>

        <p>
          Se sua letrinha não mudar de cor, pode descartar, pois ela não faz
          parte da palavra.
        </p>

        <small>
          Lembre-se: apenas são consideradas palavras do dicionário! Nada de
          inventar nem usar nomes próprios.
        </small>
      </Container>
    </Modal>
  );
};

export default HowToPlay;
