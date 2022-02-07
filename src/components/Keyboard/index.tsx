import { FaBackspace, FaCheck } from "react-icons/fa";
import { Container } from "./styles";

const KEYBOARD_KEYS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

interface KeyboardProps {
  addLetter: (letter: string) => void;
  popLetter: () => void;
  submit: () => void;
}

const Keyboard = ({ addLetter, popLetter, submit }: KeyboardProps) => {
  return (
    <Container>
      <div className="actions">
        <button onClick={popLetter}>
          <FaBackspace size="1.5rem" />
        </button>
        <button onClick={submit}>
          <FaCheck size="1.5rem" />
        </button>
      </div>
      {KEYBOARD_KEYS.map((row, index) => (
        <div className="row" key={String(index)}>
          {row.split("").map((letter) => (
            <button key={letter} onClick={() => addLetter(letter)}>
              {letter}
            </button>
          ))}
        </div>
      ))}
      .
    </Container>
  );
};

export default Keyboard;
