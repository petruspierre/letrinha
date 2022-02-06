import { useTheme } from "~/styles/theme";

import { Overlay, Content, Title } from "./styles";
import Option from "./Option";

interface ThemeSelecionProps {
  dismiss: () => void;
}

const ThemeSelection = ({ dismiss }: ThemeSelecionProps) => {
  const { changeTheme, colorTheme, themes } = useTheme();

  return (
    <>
      <Overlay role="button" onClick={dismiss}></Overlay>
      <Content role="menu">
        <Title>Mudar tema</Title>

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
    </>
  );
};

export default ThemeSelection;
