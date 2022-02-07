import Keyboard from "../Keyboard";
import useGame from "./hook";
import {
  FieldWrapper,
  Field,
  Container,
  Footer,
  FieldsContainer,
} from "./styles";

interface SimpleGameProps {
  dailyWord: string;
}

const SimpleGame = ({ dailyWord }: SimpleGameProps) => {
  const { state, submitGuess, popLetter, appendLetter } = useGame(dailyWord);

  return (
    <Container>
      <FieldsContainer>
        {state.guesses.map((guess, index) => (
          <FieldWrapper key={String(index)}>
            {Array(6)
              .fill(null)
              .map((_, letterIndex) => {
                const letterExists = guess[letterIndex];

                return (
                  <Field
                    isActive={
                      guess.length === letterIndex &&
                      state.guesses.length - 1 === index
                    }
                    exists={letterExists ? letterExists.exists : false}
                    correctPlace={
                      letterExists ? letterExists.correctPlace : false
                    }
                    key={String(letterIndex)}
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
        />
        <p>Tentativas restantes: {state.attempts}</p>
      </Footer>
    </Container>
  );
};

export default SimpleGame;
