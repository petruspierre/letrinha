import { FaBackspace, FaCheck } from "react-icons/fa";
import { Container, KeyboardButton } from "./styles";

const KEYBOARD_KEYS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

interface KeyboardProps {
  addLetter: (letter: string) => void;
  popLetter: () => void;
  submit: () => void;
  disable: boolean;
  state: Record<
    string,
    {
      letter: string;
      exists: boolean;
      correctPlace: boolean;
      used: boolean;
    }
  >;
}

const Keyboard = ({
  addLetter,
  popLetter,
  submit,
  state,
  disable,
}: KeyboardProps) => {
  return (
    <Container>
      <div className="actions">
        <button
          onClick={popLetter}
          disabled={disable}
          aria-label="Apagar letra"
          title="Apagar letra"
        >
          <FaBackspace size="1.5rem" />
        </button>
        <button
          onClick={submit}
          disabled={disable}
          aria-label="Enviar palavra"
          title="Enviar palavra"
        >
          <FaCheck size="1.5rem" />
        </button>
      </div>
      {KEYBOARD_KEYS.map((row, index) => (
        <div className="row" key={String(index)}>
          {row.split("").map((letter) => {
            const stateLetter = state[letter];

            return (
              <KeyboardButton
                key={letter}
                exists={stateLetter && stateLetter.exists}
                correctPlace={stateLetter && stateLetter.correctPlace}
                used={stateLetter && stateLetter.used}
                onClick={() => addLetter(letter)}
                aria-label={`Letra ${letter}`}
                title={`Letra ${letter}`}
                disabled={disable}
              >
                {letter}
              </KeyboardButton>
            );
          })}
        </div>
      ))}
      .
    </Container>
  );
};

export default Keyboard;
