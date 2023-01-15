import { render, screen } from "@testing-library/react";
import App from "../App";

import { expect } from "chai";

test("renders app component", () => {
  render(<App />);

  const appElement = screen.getByTestId("app");
  expect(appElement).toBeInDocument();
});
