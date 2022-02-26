import { useState } from "react";

import Keyboard from "../Keyboard";
import useGame from "./hook";
import {
  FieldWrapper,
  Field,
  GameContainer,
  Footer,
  FieldsContainer,
} from "./styles";
import useStatistics from "~/store/domain/statistics";
import Result from "./Result";

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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const { statistics } = useStatistics();

  return (
    <GameContainer>
      {state.isGameOver && statistics.current && !dismissOverlay && (
        <Result gameState={state} dismiss={setDismissOverlay} />
      )}

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
