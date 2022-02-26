import { useState } from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import Keyboard from "../Keyboard";
import useGame from "./hook";
import {
  FieldWrapper,
  Field,
  GameContainer,
  Footer,
  FieldsContainer,
  GameOverWarning,
} from "./styles";

interface SimpleGameProps {
  dailyWord: string;
  wordList: string[];
}

const SimpleGame = ({ dailyWord, wordList }: SimpleGameProps) => {
  const {
    state,
    submitGuess,
    popLetter,
    appendLetter,
    selectedIndex,
    setSelectedIndex,
    selectedGuessIndex,
  } = useGame({ dailyWord, wordList });
  const [dismissOverlay, setDismissOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  const handleShare = () => {
    const {
      statistics: { totalGuesses },
      win,
      wordLength,
      guesses,
    } = state;
    const result = win ? "ganhei" : "perdi";
    const filteredGuesses = guesses.filter((guess) =>
      guess.some(({ exists }) => exists)
    );
    const content = [
      `Eu acabei de jogar Letrinha e ${result}`,
      "",
      `${totalGuesses}/${wordLength + 1}`,
      ...filteredGuesses.map((item, index) => {
        if (index >= wordLength) return "";

        return item
          .map((letter) => {
            if (letter.correctPlace) return "🟩";
            if (letter.exists) return "🟨";
            return "🟥";
          })
          .join("");
      }),
      "",
      "Jogue também em https://www.letrinha.xyz/",
    ];

    if (typeof navigator.share !== "undefined") {
      navigator.share({
        text: content.join("\n"),
      });
    }
    navigator.clipboard.writeText(content.join("\n"));
    setCopied(true);
  };

  const renderResult = () => {
    const {
      statistics: { totalTimeSpent, totalGuesses, accuracy },
      win,
    } = state;
    const result = win ? "ganhou! 😄" : "perdeu. 😭";
    const time = `${totalTimeSpent.minutes.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
    })}:${totalTimeSpent.seconds.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
    })}`;

    return (
      <GameOverWarning>
        <h2>
          Você <span>{result}</span>
        </h2>
        <p>
          Aguarde a nova palavra em{" "}
          {formatDistance(new Date(), new Date(state.gameExpires), {
            locale: ptBR,
          })}
        </p>
        <p>
          Completou o jogo em: <span>{time}</span>
        </p>
        <p>
          em <span>{totalGuesses}</span> tentativas
        </p>
        <p>
          com <span>{accuracy.toFixed(0)}%</span> de precisão
        </p>
        <button onClick={handleShare}>
          {copied ? "Copiado" : "Compartilhar"}
        </button>
        <button onClick={() => setDismissOverlay(true)}>Ver jogo</button>
      </GameOverWarning>
    );
  };

  return (
    <GameContainer>
      {state.isGameOver &&
        state.statistics &&
        !dismissOverlay &&
        renderResult()}

      <FieldsContainer isKeyboardVisible={isKeyboardVisible}>
        {state.guesses.map((guess, index) => (
          <FieldWrapper key={String(index)}>
            {Array(dailyWord.length)
              .fill(null)
              .map((_, letterIndex) => {
                const letterExists = guess[letterIndex];
                const isSelectedGuess =
                  selectedGuessIndex === index && !state.isGameOver;

                const letterProps = {
                  exists: letterExists ? letterExists.exists : false,
                  correctPlace: letterExists
                    ? letterExists.correctPlace
                    : false,
                  onClick: isSelectedGuess
                    ? () => setSelectedIndex(letterIndex)
                    : () => {},
                };

                return (
                  <Field
                    blur={
                      !isSelectedGuess &&
                      !letterProps.exists &&
                      !letterProps.correctPlace
                    }
                    isActive={isSelectedGuess && selectedIndex === letterIndex}
                    {...letterProps}
                    key={String(letterIndex)}
                    data-testid={`field-${index}-${letterIndex}`}
                  >
                    {letterExists ? letterExists.letter : ""}
                  </Field>
                );
              })}
          </FieldWrapper>
        ))}
      </FieldsContainer>

      <Footer>
        <Keyboard
          submit={submitGuess}
          addLetter={appendLetter}
          popLetter={popLetter}
          state={state.keyBoardState}
          disable={state.isGameOver}
          isVisible={isKeyboardVisible}
          onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
        />
      </Footer>
    </GameContainer>
  );
};

export default SimpleGame;
