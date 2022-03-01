import { useState } from "react";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import * as gtag from "~/services/gtag";
import useStatistics from "~/store/domain/statistics";
import { IGameState } from "~/model/SimpleGame";
import { Button, Container } from "./styles";
import Modal from "~/components/Modal";

interface IResultProps {
  gameState: IGameState;
  dismiss: (x: boolean) => void;
}

const Result = ({ gameState, dismiss }: IResultProps) => {
  const { statistics } = useStatistics();
  const [copied, setCopied] = useState(false);

  const { totalTimeSpent, totalGuesses, accuracy } = statistics.current;
  const { win, wordLength } = gameState;

  const result = win ? "ganhou! 😄" : "perdeu. 😭";
  const time = `${totalTimeSpent.minutes.toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
  })}:${totalTimeSpent.seconds.toLocaleString("pt-BR", {
    minimumIntegerDigits: 2,
  })}`;

  const handleShare = () => {
    const result = win ? "ganhei!!" : "perdi :(";

    const filteredGuesses = gameState.guesses.filter((guess) =>
      guess.some(({ exists }) => exists)
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
    <Modal title={`Você ${result}`} dismiss={() => dismiss(true)}>
      <Container>
        <p>
          Aguarde a nova palavra em{" "}
          {formatDistance(new Date(), new Date(gameState.gameExpires), {
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
        <Button onClick={handleShare}>
          {copied ? "Copiado" : "Compartilhar"}
        </Button>
        <Button onClick={() => dismiss(true)}>Ver jogo</Button>
      </Container>
    </Modal>
  );
};

export default Result;
