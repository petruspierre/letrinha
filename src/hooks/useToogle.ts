import { useCallback, useState } from "react";

const useToggle = (initialState: boolean) => {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, toggle };
};

export { useToggle };
