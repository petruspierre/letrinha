import { render, fireEvent } from "@test/components";
import Keyboard from "..";

const KEYBOARD_KEYS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const defaultProps = {
  addLetter: jest.fn(),
  popLetter: jest.fn(),
  submit: jest.fn(),
  disable: false,
  state: {},
};

describe("Keyboard component", () => {
  describe("renders successfully", () => {
    it("render keys", () => {
      const { getByTitle } = render(<Keyboard {...defaultProps} />);

      KEYBOARD_KEYS.forEach((row) => {
        row.split("").forEach((letter) => {
          expect(getByTitle(`Letra ${letter}`)).toBeInTheDocument();
        });
      });
    });

    it("render actions", () => {
      const { getByTitle } = render(<Keyboard {...defaultProps} />);

      expect(getByTitle("Apagar letra")).toBeInTheDocument();
      expect(getByTitle("Esconder teclado")).toBeInTheDocument();
      expect(getByTitle("Enviar palavra")).toBeInTheDocument();
    });
  });

  describe("correspond to state", () => {
    it('letters that "exists" to be yellow', () => {
      const { getByTitle } = render(
        <Keyboard
          {...defaultProps}
          state={{
            a: { exists: true, letter: "a", correctPlace: false, used: true },
          }}
        />
      );

      expect(getByTitle("Letra a")).toHaveStyleRule(
        "background-color",
        "yellow"
      );
      expect(getByTitle("Letra a")).toHaveStyleRule("color", "black");
    });

    it('letters that "correctPlace" to be green', () => {
      const { getByTitle } = render(
        <Keyboard
          {...defaultProps}
          state={{
            a: { exists: true, letter: "a", correctPlace: true, used: true },
          }}
        />
      );

      expect(getByTitle("Letra a")).toHaveStyleRule(
        "background-color",
        "green"
      );
      expect(getByTitle("Letra a")).toHaveStyleRule("color", "#fff");
    });

    it('letters that "used" to be primary color', () => {
      const { getByTitle } = render(
        <Keyboard
          {...defaultProps}
          state={{
            a: { exists: false, letter: "a", correctPlace: false, used: true },
          }}
        />
      );

      expect(getByTitle("Letra a")).toHaveStyleRule(
        "background-color",
        "#F46036"
      );
      expect(getByTitle("Letra a")).toHaveStyleRule("color", "#fff");
    });
  });

  describe("when keyboard is disabled", () => {
    it("do not call callbacks", () => {
      const cb = jest.fn();

      const { getByTitle } = render(
        <Keyboard
          {...defaultProps}
          popLetter={cb}
          addLetter={cb}
          submit={cb}
          disable={true}
        />
      );

      fireEvent.click(getByTitle("Apagar letra"));
      fireEvent.click(getByTitle("Enviar palavra"));
      fireEvent.click(getByTitle("Letra a"));

      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe("action buttons", () => {
    it("toggle keyboard visibility", () => {
      const { queryByTitle } = render(<Keyboard {...defaultProps} />);

      expect(queryByTitle("Mostrar teclado")).not.toBeInTheDocument();

      fireEvent.click(queryByTitle("Esconder teclado"));

      expect(queryByTitle("Mostrar teclado")).toBeInTheDocument();
    });

    describe("actions fire callbacks", () => {
      it('"popLetter" callback', () => {
        const cb = jest.fn();

        const { getByTitle } = render(
          <Keyboard {...defaultProps} popLetter={cb} />
        );

        fireEvent.click(getByTitle("Apagar letra"));

        expect(cb).toHaveBeenCalledTimes(1);
      });

      it('"submit" callback', () => {
        const cb = jest.fn();

        const { getByTitle } = render(
          <Keyboard {...defaultProps} submit={cb} />
        );

        fireEvent.click(getByTitle("Enviar palavra"));

        expect(cb).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("key letter buttons", () => {
    it('calls "addLetter" callback', () => {
      const cb = jest.fn();

      const { getByTitle } = render(
        <Keyboard {...defaultProps} addLetter={cb} />
      );

      fireEvent.click(getByTitle("Letra a"));

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith("a");
    });
  });
});
