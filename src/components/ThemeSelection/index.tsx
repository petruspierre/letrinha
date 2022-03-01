import { useTheme } from "~/styles/theme";

import { Content } from "./styles";
import Option from "./Option";
import Modal from "../Modal";

interface ThemeSelecionProps {
  dismiss: () => void;
}

const ThemeSelection = ({ dismiss }: ThemeSelecionProps) => {
  const { changeTheme, colorTheme, themes } = useTheme();

  return (
    <Modal dismiss={dismiss} title="Temas">
      <Content>
        {Object.keys(themes).map((themeName) => {
          const theme = themes[themeName];
          const isActive = colorTheme === themeName;

          return (
            <Option
              key={theme.name}
              active={isActive}
              name={theme.name}
              colors={theme.colors}
              onClick={() => changeTheme(themeName)}
            />
          );
        })}
      </Content>
    </Modal>
  );
};

export default ThemeSelection;
