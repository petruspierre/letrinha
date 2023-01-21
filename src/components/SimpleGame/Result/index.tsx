import { useState } from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import * as gtag from "~/services/gtag";
import useStatistics from "~/store/modules/statistics";
import { IGameState } from "~/model/SimpleGame";
import {
  Button,
  ButtonWrapper,
  Container,
  History,
  Preview,
  PreviewWrapper,
} from "./styles";
import Modal from "~/components/Modal";

interface IResultProps {
  gameState: IGameState;
  dismiss: (x: boolean) => void;
}

const Result = ({ gameState, dismiss }: IResultProps) => {
  const { statistics } = useStatistics();
  const [copied, setCopied] = useState(false);

  const { totalGuesses } = statistics.current;
  const {
    longestStreak,
    totalVictories,
    totalGames,
    averageAccuracy,
    currentStreak,
  } = statistics.history;
  const { win, wordLength } = gameState;

  const result = win
    ? "Você ganhou, parabéns!"
    : "Você perdeu, não foi dessa vez :(";

  const handleShare = () => {
    const result = win ? "ganhei!" : "perdi :(";

    const filteredGuesses = gameState.guesses.filter((guess) =>
      guess.some(({ letter }) => letter)
    );
    const content = [
      `Eu acabei de jogar Letrinha e ${result}`,
      "",
      `${totalGuesses}/${wordLength + 1}`,
      ...filteredGuesses.map((item, index) => {
        if (index > wordLength) return "";

        return item
          .map((letter) => {
            if (letter.correctPlace) return "🟩";
            if (letter.exists) return "🟨";
            return "🟥";
          })
          .join("");
      }),
      "",
      `🔥 ${currentStreak}`,
      "Jogue também em https://www.letrinha.xyz",
    ];

    if (typeof navigator.share !== "undefined") {
      navigator.share({
        text: content.join("\n"),
      });
    }
    navigator.clipboard.writeText(content.join("\n"));
    setCopied(true);

    gtag.event({
      action: "share",
      category: "game",
      label: "method",
      value: 1,
    });
  };

  return (
    <Modal title="RESULTADOS" dismiss={() => dismiss(true)}>
      <Container>
        <h2>{result}</h2>
        <p>A palavra do dia foi</p>
        <PreviewWrapper>
          {statistics.current.correctWord.split("").map((letter, index) => (
            <Preview
              exists={gameState.keyBoardState[letter]?.exists}
              correctPlace={gameState.keyBoardState[letter]?.correctPlace}
              key={`${letter}-${index}`}
            >
              {letter.toUpperCase()}
            </Preview>
          ))}
        </PreviewWrapper>

        <History>
          <h3>Suas estatísticas</h3>
          <table>
            <tbody>
              <tr>
                <td>Maior sequência</td>
                <td>{longestStreak}</td>
              </tr>
              <tr>
                <td>Sequência atual</td>
                <td>{currentStreak}</td>
              </tr>
              <tr>
                <td>Palavras jogadas</td>
                <td>{totalGames}</td>
              </tr>
              <tr>
                <td>Palavras acertadas</td>
                <td>{totalVictories}</td>
              </tr>
              <tr>
                <td>Precisão média</td>
                <td>{averageAccuracy.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </History>

        <ButtonWrapper>
          <Button onClick={handleShare}>
            {copied ? "Copiado!" : "Compartilhar"}
          </Button>
          <Button onClick={() => dismiss(true)}>Ver jogo</Button>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default Result;
