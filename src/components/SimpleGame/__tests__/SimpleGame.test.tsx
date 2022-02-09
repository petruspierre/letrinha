import userEvent from "@testing-library/user-event";
import { render } from "@test/components";
import SimpleGame from "..";

const defaultProps = {
  dailyWord: "papel",
};

describe("SimpleGame component", () => {
  const activeStyle = { "border-bottom-width": "6px" };

  describe("initial render", () => {
    describe("render the correct amount of fields", () => {
      it("renders 5 fields", () => {
        const { getByTestId } = render(<SimpleGame dailyWord="aaaaa" />);

        for (let i = 0; i < 5; i++) {
          expect(getByTestId(`field-0-${i}`)).toBeInTheDocument();
        }
      });

      it("renders 6 fields", () => {
        const { getByTestId } = render(<SimpleGame dailyWord="aaaaaa" />);

        for (let i = 0; i < 6; i++) {
          expect(getByTestId(`field-0-${i}`)).toBeInTheDocument();
        }
      });
    });

    describe("render the correct amount of attempts", () => {
      it("renders 6 attempts", () => {
        const { getByText } = render(<SimpleGame dailyWord="aaaaa" />);

        expect(getByText("Tentativas restantes: 6")).toBeInTheDocument();
      });

      it("renders 7 attempts", () => {
        const { getByText } = render(<SimpleGame dailyWord="aaaaaa" />);

        expect(getByText("Tentativas restantes: 7")).toBeInTheDocument();
      });
    });

    it("first index is selected", () => {
      const { getByTestId } = render(<SimpleGame {...defaultProps} />);

      expect(getByTestId("field-0-0")).toHaveStyleRule(activeStyle);
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
