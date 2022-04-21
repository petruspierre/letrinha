import { FaPalette, FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/router";

import Logo from "~/components/Logo";
import { useTheme } from "~/styles/theme";

import { Button, Container, LogoButton } from "./styles";

interface HeaderProps {
  toggleModal: (modal: "HowToPlay" | "Settings" | "Donate") => void;
  showLogo?: boolean;
}

const Header = ({ toggleModal, showLogo = true }: HeaderProps) => {
  const { showThemeSelection } = useTheme();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Button
        onClick={() => toggleModal("Donate")}
        aria-label="Fazer doação"
        title="Fazer doação"
      >
        <img
          draggable={false}
          src="/assets/icons/donate.svg"
          alt="Ícone de cofre"
        />
      </Button>
      <Button
        onClick={() => toggleModal("HowToPlay")}
        aria-label="Como jogar?"
        title="Como jogar?"
      >
        <img
          draggable={false}
          src="/assets/icons/help.svg"
          alt="Ícone de interrogação"
        />
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
        <img
          draggable={false}
          src="/assets/icons/theme.svg"
          alt="Ícone de paleta"
        />
      </Button>
      <Button
        onClick={() => toggleModal("Settings")}
        aria-label="Configurações"
        title="Configurações"
      >
        <img
          draggable={false}
          src="/assets/icons/settings.svg"
          alt="Ícone de engrenagem"
        />
      </Button>
    </Container>
  );
};

export default Header;
