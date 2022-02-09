import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@test/components";
import SimpleGame from "..";
import { act } from "react-dom/test-utils";

const defaultProps = {
  dailyWord: "papel",
  wordList: ["papel", "teste", "placa"],
};

describe("SimpleGame component", () => {
  const activeStyle = { "border-bottom-width": "6px" };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("initial render", () => {
    describe("render the correct amount of fields", () => {
      it("renders 5 fields", () => {
        const { getByTestId } = render(
          <SimpleGame {...defaultProps} dailyWord="aaaaa" />
        );

        for (let i = 0; i < 5; i++) {
          expect(getByTestId(`field-0-${i}`)).toBeInTheDocument();
        }
      });

      it("renders 6 fields", () => {
        const { getByTestId } = render(
          <SimpleGame {...defaultProps} dailyWord="aaaaaa" />
        );

        for (let i = 0; i < 6; i++) {
          expect(getByTestId(`field-0-${i}`)).toBeInTheDocument();
        }
      });
    });

    describe("render the correct amount of attempts", () => {
      it("renders 6 attempts", () => {
        const { getByText } = render(
          <SimpleGame {...defaultProps} dailyWord="aaaaa" />
        );

        expect(getByText("Tentativas restantes: 6")).toBeInTheDocument();
      });

      it("renders 7 attempts", () => {
        const { getByText } = render(
          <SimpleGame {...defaultProps} dailyWord="aaaaaa" />
        );

        expect(getByText("Tentativas restantes: 7")).toBeInTheDocument();
      });
    });

    it("first index is selected", () => {
      const { getByTestId } = render(<SimpleGame {...defaultProps} />);

      expect(getByTestId("field-0-0")).toHaveStyleRule(activeStyle);
    });
  });

  describe("gameplay", () => {
    describe("user type a letter", () => {
      describe("show the letter in the correct index", () => {
        it('show "a" in the first field', () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("a");

          expect(getByTestId("field-0-0")).toHaveTextContent("a");
        });

        it('show "a" in the second field', () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("{ArrowRight}a");

          expect(getByTestId("field-0-0")).not.toHaveTextContent("a");
          expect(getByTestId("field-0-1")).toHaveTextContent("a");
        });
      });

      describe("type an entire word", () => {
        it("show the letters in the correct spots", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("papel");

          expect(getByTestId("field-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-4")).toHaveTextContent("l");
        });

        it("can swap positions in the meantime", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("da{ArrowLeft}{ArrowLeft}p{ArrowRight}pel");

          expect(getByTestId("field-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-4")).toHaveTextContent("l");
        });

        it("can use backspace in the meantime", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard(
            "d{Backspace}pap{Backspace}pec{Backspace}{Backspace}el"
          );

          expect(getByTestId("field-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-4")).toHaveTextContent("l");
        });
      });
    });

    describe("user submit a word", () => {
      describe("something is invalid", () => {
        describe("wordList is empty", () => {
          it("render a toast and does not persist", async () => {
            const { getByText } = render(
              <SimpleGame {...defaultProps} wordList={[]} />
            );

            userEvent.keyboard("aaaaa{Enter}");

            await waitFor(() =>
              expect(
                getByText(
                  "Carregando banco de palavras, por favor aguarde e tente novamente."
                )
              ).toBeInTheDocument()
            );
            expect(localStorage.setItem).not.toHaveBeenCalled();
          });
        });

        describe("word is not presentin dictionary", () => {
          it("render a toast and does not persist", async () => {
            const { getByText } = render(<SimpleGame {...defaultProps} />);

            userEvent.keyboard("aaaaa{Enter}");

            await waitFor(() =>
              expect(
                getByText("Palavra não consta no dicionário, tente novamente.")
              ).toBeInTheDocument()
            );
            expect(localStorage.setItem).not.toHaveBeenCalled();
          });
        });
      });

      describe("word is valid", () => {
        describe("did not win", () => {
          describe("is not the last attempt", () => {
            it("render new line", () => {
              const { getByTestId } = render(<SimpleGame {...defaultProps} />);

              userEvent.keyboard("placa{Enter}");

              expect(getByTestId("field-1-0")).toBeInTheDocument();
            });

            describe("some letter exists", () => {
              it("render yellow characters", async () => {
                const { getByTestId } = render(
                  <SimpleGame {...defaultProps} />
                );

                userEvent.keyboard("placa{Enter}");

                expect(getByTestId("field-0-1")).toHaveStyleRule(
                  "border-color: yellow"
                );
                expect(getByTestId("field-0-2")).not.toHaveStyleRule(
                  "border-color: yellow"
                );
                expect(getByTestId("field-0-4")).toHaveStyleRule(
                  "border-color: yellow"
                );
                expect(localStorage.setItem).toHaveBeenCalled();
              });
            });

            describe("some letter in correct place", () => {
              it("render green characters", async () => {
                const { getByTestId } = render(
                  <SimpleGame {...defaultProps} />
                );

                userEvent.keyboard("placa{Enter}");

                expect(getByTestId("field-0-0")).toHaveStyleRule(
                  "border-color: green"
                );
                expect(localStorage.setItem).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });

  describe("interact with keyboard", () => {
    describe("selectedIndex", () => {
      describe("moves forward", () => {
        it("moves when press ArrowRight", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).toHaveStyleRule(activeStyle);
        });

        it("moves when press a letter key", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("a");

          expect(getByTestId("field-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).toHaveStyleRule(activeStyle);
        });
      });

      describe("moves backward", () => {
        it("does not move when the first is selected", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("{ArrowLeft}");

          expect(getByTestId("field-0-0")).toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).not.toHaveStyleRule(activeStyle);
        });

        it("moves back when press ArrowLeft", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).toHaveStyleRule(activeStyle);

          userEvent.keyboard("{ArrowLeft}");

          expect(getByTestId("field-0-0")).toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).not.toHaveStyleRule(activeStyle);
        });

        it("moves back when press backspace key", () => {
          const { getByTestId } = render(<SimpleGame {...defaultProps} />);

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).toHaveStyleRule(activeStyle);

          userEvent.keyboard("{Backspace}");

          expect(getByTestId("field-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-1")).toHaveStyleRule(activeStyle);
        });
      });
    });
  });
});
