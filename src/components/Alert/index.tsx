import { Container } from "./styles";

interface AlertProps {
  alert: Partial<{
    title?: string;
    message: string;
  }>;
  dismissAlert: () => void;
}

const Alert = ({ alert, dismissAlert }: AlertProps) => {
  return (
    <Container>
      {alert && (
        <>
          {alert.title && <h3>{alert.title}</h3>}
          <p>{alert.message}</p>
        </>
      )}
    </Container>
  );
};

export default Alert;
