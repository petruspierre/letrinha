import { formatISO, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import Keyboard from "../Keyboard";
import useGame from "./hook";
import {
  FieldWrapper,
  Field,
  Container,
  Footer,
  FieldsContainer,
  GameOverWarning,
} from "./styles";

interface SimpleGameProps {
  dailyWord: string;
}

const SimpleGame = ({ dailyWord }: SimpleGameProps) => {
  const {
    state,
    submitGuess,
    popLetter,
    appendLetter,
    selectedIndex,
    setSelectedIndex,
  } = useGame(dailyWord);
  const [dismissOverlay, setDismissOverlay] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const {
      statistics: { totalGuesses },
      win,
      wordLength,
      guesses,
    } = state;
    const result = win ? "ganhei" : "perdi";
    const content = [
      `Eu acabei de jogar Letrinha e ${result}`,
      "",
      `${totalGuesses}/${wordLength + 1}`,
      ...guesses.map((item) => {
        return item
          .map((letter) => {
            if (letter.correctPlace) return "🟩";
            if (letter.exists) return "🟨";
            return "🟥";
          })
          .join("");
      }),
      "",
      "Jogue também em https://bit.ly/jogue-letrinha",
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
    <Container>
      {state.isGameOver &&
        state.statistics &&
        !dismissOverlay &&
        renderResult()}

      <FieldsContainer>
        {state.guesses.map((guess, index) => (
          <FieldWrapper key={String(index)}>
            {Array(dailyWord.length)
              .fill(null)
              .map((_, letterIndex) => {
                const letterExists = guess[letterIndex];
                const isLastGuess = state.guesses.length - 1 === index;

                return (
                  <Field
                    isActive={isLastGuess && selectedIndex === letterIndex}
                    exists={letterExists ? letterExists.exists : false}
                    correctPlace={
                      letterExists ? letterExists.correctPlace : false
                    }
                    key={String(letterIndex)}
                    onClick={
                      isLastGuess
                        ? () => setSelectedIndex(letterIndex)
                        : () => {}
                    }
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
        />
        <p>Tentativas restantes: {state.attempts}</p>
      </Footer>
    </Container>
  );
};

export default SimpleGame;
