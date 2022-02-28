import { CloseButton, Content, Overlay, Title } from "./styles";

interface IModalProps {
  dismiss: () => void;
  title?: string;
}

const Modal: React.FC<IModalProps> = ({ children, dismiss, title }) => {
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

        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </>
  );
};

export default Modal;
