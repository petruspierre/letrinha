import { renderHook, act } from "@testing-library/react-hooks";
import { themes } from "@test/fixtures/theme";

import { useTheme, ThemeProvider } from "../Context";

const Mount = () => {
  const mount = renderHook(useTheme, {
    wrapper: ({ children }) => (
      <ThemeProvider themes={themes}>{children}</ThemeProvider>
    ),
  });
  return mount;
};

describe("Theme Context", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("change and persist theme", async () => {
    const { result } = Mount();

    act(() => {
      result.current.changeTheme("dark");
    });

    expect(result.current.colorTheme).toEqual("dark");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      expect.any(String),
      "dark"
    );
  });

  it("return the correct color after the merge", () => {
    const { result } = Mount();

    expect(result.current.theme.colors).toHaveProperty("primary", "#F46036");
    expect(result.current.theme.colors).toHaveProperty("secondary", "#18A999");
    expect(result.current.theme).toHaveProperty("name", "Default");

    act(() => {
      result.current.changeTheme("dark");
    });

    expect(result.current.theme.colors).toHaveProperty("primary", "#555");
    expect(result.current.theme.colors).toHaveProperty("secondary", "#777");
    expect(result.current.theme).toHaveProperty("name", "Dark");
  });
});
