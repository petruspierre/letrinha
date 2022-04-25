import { CloseButton, Content, Overlay, Title } from "./styles";

interface IModalProps {
  dismiss?: () => void;
  title?: string;
}

const Modal: React.FC<IModalProps> = ({ children, dismiss, title }) => {
  const onDismiss = () => {
    if (dismiss) {
      dismiss();
    }
  };

  return (
    <>
      <Overlay role="button" onClick={onDismiss}></Overlay>
      <Content>
        {dismiss && (
          <CloseButton
            onClick={dismiss}
            title="Fechar janela"
            aria-label="Fechar janela"
          >
            ✕
          </CloseButton>
        )}

        {title && <Title>{title}</Title>}
        {children}
      </Content>
    </>
  );
};

export default Modal;
