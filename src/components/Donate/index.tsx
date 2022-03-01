import Modal from "../Modal";
import QRCode from "react-qr-code";
import { Container, QRContainer } from "./styles";

interface IDonateProps {
  dismiss: () => void;
}

const PIX_KEY = "ajude.letrinha@petrus.dev.br";

const Donate = ({ dismiss }: IDonateProps) => {
  return (
    <Modal dismiss={dismiss} title="Nos ajude a continuar melhorando!">
      <Container>
        <p>
          Nos faça uma doação de qualquer valor para nos estimular a continuar.
        </p>

        <span>QR code do pix:</span>
        <QRContainer>
          <QRCode
            value="00020126500014BR.GOV.BCB.PIX0128ajude.letrinha@petrus.dev.br5204000053039865802BR5925Petrus Pierre Ormesino Be6011Joao Pessoa62170513AJUDELETRINHA63048F4F"
            title="Chave pix"
          />
        </QRContainer>

        <p>Chave pix por email:</p>
        <p>
          {PIX_KEY}
          <button
            title="Copiar chave"
            aria-label="Copiar chave pix"
            onClick={() => navigator.clipboard.writeText(PIX_KEY)}
          >
            Copiar
          </button>
        </p>
      </Container>
    </Modal>
  );
};

export default Donate;
