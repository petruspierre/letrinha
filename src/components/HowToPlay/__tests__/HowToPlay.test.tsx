import { render, fireEvent } from "@test/components";

import HowToPlay from "..";

const defaultProps = {
  dismiss: jest.fn(),
};

describe("HowToPlay component", () => {
  it("matches snapshot", () => {
    const { container } = render(<HowToPlay {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("calls dismiss callback", () => {
    const cb = jest.fn();

    const { getByTitle } = render(<HowToPlay {...defaultProps} dismiss={cb} />);

    fireEvent.click(getByTitle("Fechar janela"));

    expect(cb).toBeCalledTimes(1);
  });
});
