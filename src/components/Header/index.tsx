import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/router";

import Logo from "~/components/Logo";
import { useTheme } from "~/styles/theme";

import { Button, Container, LogoButton } from "./styles";

interface HeaderProps {
  toggleInstructions: () => void;
  showLogo: boolean;
}

const Header = ({ toggleInstructions, showLogo = true }: HeaderProps) => {
  const { showThemeSelection } = useTheme();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button
        onClick={toggleInstructions}
        aria-label="Fazer doação"
        title="Fazer doação"
      >
        <img src="/assets/icons/donate.svg" alt="Ícone de cofre" />
      </Button>
      <Button
        onClick={toggleInstructions}
        aria-label="Como jogar?"
        title="Como jogar?"
      >
        <img src="/assets/icons/help.svg" alt="Ícone de interrogação" />
      </Button>
      {showLogo && (
        <LogoButton onClick={goHome} title="Letrinha - Voltar para início">
          <Logo />
        </LogoButton>
      )}
      <Button
        onClick={showThemeSelection}
        aria-label="Mudar tema"
        title="Mudar tema"
      >
        <img src="/assets/icons/theme.svg" alt="Ícone de paleta" />
      </Button>
      <Button
        onClick={showThemeSelection}
        aria-label="Configurações"
        title="Configurações"
      >
        <img src="/assets/icons/settings.svg" alt="Ícone de engrenagem" />
      </Button>
    </Container>
  );
};

export default Header;
