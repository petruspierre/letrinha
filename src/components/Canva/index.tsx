import React from "react";
import { IGuess } from "~/model/SimpleGame";
import { Container, Field, FieldsWrapper } from "./styles";

interface ICanvaProps {
  wordLength: number;
  attempts: number;
  selectedLetter: number;
  selectedGuess: number;
  index: number;
  onLetterClick: (letter: number) => void;
  guesses: IGuess[];
  isGameOver: boolean;
}

const Canva = ({
  wordLength,
  attempts,
  selectedGuess,
  selectedLetter,
  onLetterClick,
  index,
  guesses,
  isGameOver,
}: ICanvaProps) => {
  return (
    <Container>
      <FieldsWrapper columns={wordLength} rows={attempts}>
        {guesses.map((guess, guessIndex) => {
          return (
            <React.Fragment key={guessIndex}>
              {Array(wordLength)
                .fill(null)
                .map((_, letterIndex) => {
                  const existingLetter = guess[letterIndex];
                  const isSelectedGuess = selectedGuess === guessIndex;

                  const letterExists = existingLetter?.exists;
                  const letterCorrectPlace = existingLetter?.correctPlace;

                  return (
                    <Field
                      blur={
                        (!isSelectedGuess &&
                          !letterExists &&
                          !letterCorrectPlace) ||
                        isGameOver
                      }
                      isActive={
                        selectedLetter === letterIndex &&
                        isSelectedGuess &&
                        !isGameOver
                      }
                      exists={letterExists}
                      correctPlace={letterCorrectPlace}
                      onClick={(e: any) => [
                        onLetterClick(letterIndex),
                        e.target.blur(),
                      ]}
                      disabled={!isSelectedGuess && !isGameOver}
                      key={String(letterIndex)}
                      data-testid={`field-${index}-${guessIndex}-${letterIndex}`}
                    >
                      {existingLetter?.letter ?? ""}
                    </Field>
                  );
                })}
            </React.Fragment>
          );
        })}
      </FieldsWrapper>
    </Container>
  );
};

export default Canva;
