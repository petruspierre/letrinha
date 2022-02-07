import { render, fireEvent } from "@test/components";

import ThemeSelection from "..";

const defaultProps = {
  dismiss: jest.fn(),
};

describe("Theme Selection component", () => {
  describe("renders successfully", () => {
    it("render all themes", () => {
      const { getByText } = render(<ThemeSelection {...defaultProps} />);

      expect(getByText("Light")).toBeInTheDocument();
      expect(getByText("Dark")).toBeInTheDocument();
      expect(getByText("Default")).toBeInTheDocument();
    });
  });

  describe("interacts successfully", () => {
    it("call dismiss function", () => {
      const cb = jest.fn();

      const { getByRole } = render(<ThemeSelection dismiss={cb} />);

      fireEvent.click(getByRole("button"));

      expect(cb).toHaveBeenCalledTimes(1);
    });

    it("change theme", () => {
      const { getByText } = render(<ThemeSelection {...defaultProps} />);

      const darkTheme = getByText("Dark").parentElement;
      const defaultTheme = getByText("Default").parentElement;

      expect(defaultTheme).toHaveStyleRule("border-bottom");
      expect(darkTheme).not.toHaveStyleRule("border-bottom");

      fireEvent.click(darkTheme);

      expect(defaultTheme).not.toHaveStyleRule("border-bottom");
      expect(darkTheme).toHaveStyleRule("border-bottom");
    });
  });
});
