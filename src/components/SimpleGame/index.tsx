import { formatISO, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
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

  return (
    <Container>
      {state.isGameOver && (
        <GameOverWarning>
          <h2>
            Acabaram suas tentativas de hoje. Aguarde a nova palavra em{" "}
            {formatDistance(new Date(), new Date(state.gameExpires), {
              locale: ptBR,
            })}
          </h2>
        </GameOverWarning>
      )}

      <FieldsContainer>
        {state.guesses.map((guess, index) => (
          <FieldWrapper key={String(index)}>
            {Array(6)
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
        />
        <p>Tentativas restantes: {state.attempts}</p>
      </Footer>
    </Container>
  );
};

export default SimpleGame;
