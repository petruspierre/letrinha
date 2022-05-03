import Modal from "../Modal";
import { Option, OptionsContainer } from "./styles";

interface IPracticeDifficultyProps {
  dismiss: () => void;
  onSelect: (option: "5" | "6") => void;
}

const PracticeDifficulty = ({
  dismiss,
  onSelect,
}: IPracticeDifficultyProps) => {
  return (
    <Modal dismiss={dismiss} title="Dificuldade do modo treino">
      <OptionsContainer>
        <Option onClick={() => onSelect("5")}>Normal</Option>
        <Option onClick={() => onSelect("6")}>Dificil</Option>
      </OptionsContainer>
    </Modal>
  );
};

export default PracticeDifficulty;
