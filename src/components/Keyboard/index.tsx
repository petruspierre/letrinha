import { useState } from "react";
import { FaBackspace, FaCheck, FaKeyboard } from "react-icons/fa";
import { Arrow, Container, KeyboardButton, KeyboardWrapper } from "./styles";

const KEYBOARD_KEYS = ["qwertyuiop", "asdfghjkl-", "zxcvbnm]"];

interface KeyboardProps {
  addLetter: (letter: string) => void;
  popLetter: () => void;
  submit: () => void;
  disable: boolean;
  isVisible: boolean;
  onClick: () => void;
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
  isVisible,
  onClick,
}: KeyboardProps) => {
  return (
    <Container>
      <KeyboardWrapper isVisible={isVisible} aria-hidden={!isVisible}>
        {KEYBOARD_KEYS.map((row, index) => (
          <div className="row" key={String(index)}>
            {row.split("").map((letter) => {
              const stateLetter = state[letter];
              const defaultProps = {
                exists: stateLetter && stateLetter.exists,
                correctPlace: stateLetter && stateLetter.correctPlace,
                used: stateLetter && stateLetter.used,
              };

              if (letter === "-") {
                return (
                  <KeyboardButton
                    key={letter}
                    {...defaultProps}
                    onClick={popLetter}
                    aria-label="Apagar letra"
                    title="Apagar letra"
                    disabled={disable}
                  >
                    <img
                      src="assets/icons/chevron-left.svg"
                      alt="Apagar letra"
                    />
                  </KeyboardButton>
                );
              }

              if (letter === "]") {
                return (
                  <KeyboardButton
                    key={letter}
                    {...defaultProps}
                    onClick={submit}
                    disabled={disable}
                    aria-label="Enviar palavra"
                    title="Enviar palavra"
                    className="dual"
                  >
                    enter
                  </KeyboardButton>
                );
              }

              return (
                <KeyboardButton
                  {...defaultProps}
                  key={letter}
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
      </KeyboardWrapper>
      <div className="actions">
        <button
          onClick={onClick}
          aria-label={`${isVisible ? "Esconder" : "Mostrar"} teclado`}
          title={`${isVisible ? "Esconder" : "Mostrar"} teclado`}
        >
          <p>{isVisible ? "Esconder" : "Mostrar"} teclado</p>
          <FaKeyboard size="1.5rem" />
          <Arrow
            src="/assets/icons/chevron-up.svg"
            keyboardVisible={isVisible}
            alt="Seta indicadora"
          />
        </button>
      </div>
    </Container>
  );
};

export default Keyboard;
