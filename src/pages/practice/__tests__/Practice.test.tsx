import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@test/components";
import MockAdapter from "axios-mock-adapter";

import PracticeGame from "../[wordLength].page";
import api from "~/services/api";
import { letrinhaApi } from "~/services/letrinhaApi";

const wordListResponse = ["papel", "teste", "placa"];

const randomWordResponse = [
  {
    word: "papel",
  },
];

const mockApi = new MockAdapter(api);
const mockLetrinhaApi = new MockAdapter(letrinhaApi);

xdescribe("PracticeGame component", () => {
  const activeStyle = { "border-bottom-width": "6px" };

  beforeEach(() => {
    jest.clearAllMocks();

    mockLetrinhaApi.onGet("/practice/random").reply(200, randomWordResponse);
    mockApi.onGet("word/word-list").reply(200, wordListResponse);
  });

  describe("initial render", () => {
    describe("render the correct amount of fields", () => {
      it("renders 5 fields", async () => {
        const { getByTestId, queryByTestId } = render(<PracticeGame />);

        await waitFor(() =>
          expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
        );

        for (let i = 0; i < 5; i++) {
          expect(getByTestId(`field-0-0-${i}`)).toBeInTheDocument();
        }
      });

      it("renders 6 fields", async () => {
        mockLetrinhaApi
          .onGet("/practice/random")
          .reply(200, [{ word: "testes" }]);

        const { getByTestId, queryByTestId } = render(<PracticeGame />);

        await waitFor(() =>
          expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
        );

        for (let i = 0; i < 6; i++) {
          expect(getByTestId(`field-0-0-${i}`)).toBeInTheDocument();
        }
      });
    });

    it("first index is selected", async () => {
      const { getByTestId, queryByTestId } = render(<PracticeGame />);

      await waitFor(() =>
        expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
      );

      expect(getByTestId("field-0-0-0")).toHaveStyleRule(activeStyle);
    });
  });

  describe("gameplay", () => {
    describe("user type a letter", () => {
      describe("show the letter in the correct index", () => {
        it('show "a" in the first field', async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("a");

          expect(getByTestId("field-0-0-0")).toHaveTextContent("a");
        });

        it('show "a" in the second field', async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("{ArrowRight}a");

          expect(getByTestId("field-0-0-0")).not.toHaveTextContent("a");
          expect(getByTestId("field-0-0-1")).toHaveTextContent("a");
        });
      });

      describe("type an entire word", () => {
        it("show the letters in the correct spots", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("papel");

          expect(getByTestId("field-0-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-0-4")).toHaveTextContent("l");
        });

        it("can swap positions in the meantime", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("da{ArrowLeft}{ArrowLeft}p{ArrowRight}pel");

          expect(getByTestId("field-0-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-0-4")).toHaveTextContent("l");
        });

        it("can use backspace in the meantime", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard(
            "d{Backspace}pap{Backspace}pec{Backspace}{Backspace}el"
          );

          expect(getByTestId("field-0-0-0")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-1")).toHaveTextContent("a");
          expect(getByTestId("field-0-0-2")).toHaveTextContent("p");
          expect(getByTestId("field-0-0-3")).toHaveTextContent("e");
          expect(getByTestId("field-0-0-4")).toHaveTextContent("l");
        });
      });
    });

    describe("user submit a word", () => {
      describe("something is invalid", () => {
        describe("wordList is empty", () => {
          it("render a toast and does not persist", async () => {
            const { getByText, queryByTestId } = render(<PracticeGame />);

            await waitFor(() =>
              expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
            );

            userEvent.keyboard("aaaaa{Enter}");

            await waitFor(() =>
              expect(
                getByText("Palavra não consta no dicionário, tente novamente.")
              ).toBeInTheDocument()
            );
          });
        });

        describe("word is not presentin dictionary", () => {
          it("render a toast and does not persist", async () => {
            const { getByText, queryByTestId } = render(<PracticeGame />);

            await waitFor(() =>
              expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
            );

            userEvent.keyboard("aaaaa{Enter}");

            await waitFor(() =>
              expect(
                getByText("Palavra não consta no dicionário, tente novamente.")
              ).toBeInTheDocument()
            );
          });
        });
      });

      describe("word is valid", () => {
        describe("did not win", () => {
          describe("is not the last attempt", () => {
            it("render new line", async () => {
              const { getByTestId, queryByTestId } = render(<PracticeGame />);

              await waitFor(() =>
                expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
              );

              userEvent.keyboard("placa{Enter}");

              expect(getByTestId("field-0-1-0")).toBeInTheDocument();
            });

            describe("some letter exists", () => {
              it("render yellow characters", async () => {
                const { getByTestId, queryByTestId } = render(<PracticeGame />);

                await waitFor(() =>
                  expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
                );

                userEvent.keyboard("placa{Enter}");

                expect(getByTestId("field-0-0-1")).toHaveStyleRule(
                  "border-color: yellow"
                );
                expect(getByTestId("field-0-0-2")).not.toHaveStyleRule(
                  "border-color: yellow"
                );
                expect(getByTestId("field-0-0-4")).toHaveStyleRule(
                  "border-color: yellow"
                );
              });
            });

            describe("some letter in correct place", () => {
              it("render green characters", async () => {
                const { getByTestId, queryByTestId } = render(<PracticeGame />);

                await waitFor(() =>
                  expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
                );

                userEvent.keyboard("placa{Enter}");

                expect(getByTestId("field-0-0-0")).toHaveStyleRule(
                  "border-color: green"
                );
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
        it("moves when press ArrowRight", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).toHaveStyleRule(activeStyle);
        });

        it("moves when press a letter key", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("a");

          expect(getByTestId("field-0-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).toHaveStyleRule(activeStyle);
        });
      });

      describe("moves backward", () => {
        it("does not move when the first is selected", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("{ArrowLeft}");

          expect(getByTestId("field-0-0-0")).toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).not.toHaveStyleRule(activeStyle);
        });

        it("moves back when press ArrowLeft", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).toHaveStyleRule(activeStyle);

          userEvent.keyboard("{ArrowLeft}");

          expect(getByTestId("field-0-0-0")).toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).not.toHaveStyleRule(activeStyle);
        });

        it("moves back when press backspace key", async () => {
          const { getByTestId, queryByTestId } = render(<PracticeGame />);

          await waitFor(() =>
            expect(queryByTestId("field-0-0-0")).toBeInTheDocument()
          );

          userEvent.keyboard("{ArrowRight}");

          expect(getByTestId("field-0-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).toHaveStyleRule(activeStyle);

          userEvent.keyboard("{Backspace}");

          expect(getByTestId("field-0-0-0")).not.toHaveStyleRule(activeStyle);
          expect(getByTestId("field-0-0-1")).toHaveStyleRule(activeStyle);
        });
      });
    });
  });
});
