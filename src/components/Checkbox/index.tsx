import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "./styles";

export interface CheckboxProps extends HTMLInputElement {
  checked: boolean;
}

const Checkbox = ({ checked, ...props }: CheckboxProps) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;
