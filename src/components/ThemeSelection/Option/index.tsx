import { Container, Preview } from "./styles";

interface OptionProps {
  active: boolean;
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  onClick: () => void;
}

const Option = ({ name, colors, onClick, active }: OptionProps) => (
  <Container role="menuitem" active={active} onClick={onClick}>
    <span>{name}</span>
    <div>
      <Preview data-testid="previewPrimary" color={colors.primary} />
      <Preview data-testid="previewSecondary" color={colors.secondary} />
    </div>
  </Container>
);

export default Option;
