import { CloseButton, Content, Overlay } from "./styles";

interface IModalProps {
  dismiss: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, dismiss }) => {
  return (
    <>
      <Overlay role="button" onClick={dismiss}></Overlay>
      <Content>
        <CloseButton
          onClick={dismiss}
          title="Fechar janela"
          aria-label="Fechar janela"
        >
          ✕
        </CloseButton>
        {children}
      </Content>
    </>
  );
};

export default Modal;
