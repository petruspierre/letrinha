import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/router";

import Logo from "~/components/Logo";
import { useTheme } from "~/styles/theme";

import { Button, Container, LogoButton } from "./styles";

interface HeaderProps {
  toggleInstructions: () => void;
}

const Header = ({ toggleInstructions }: HeaderProps) => {
  const { showThemeSelection } = useTheme();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button
        onClick={toggleInstructions}
        aria-label="Como jogar?"
        title="Como jogar?"
      >
        <FaQuestionCircle size="1.5rem" />
      </Button>
      <LogoButton onClick={goHome} title="Letrinha - Voltar para início">
        <Logo />
      </LogoButton>
      <Button
        onClick={showThemeSelection}
        aria-label="Mudar tema"
        title="Mudar tema"
      >
        <FaPalette size="1.5rem" />
      </Button>
    </Container>
  );
};

export default Header;
