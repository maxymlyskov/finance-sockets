import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

import { expect } from "chai";

test("renders Header", () => {
  render(<Header />);

  const headerElement = screen.getByTestId("header");
  expect(headerElement).toBeInDocument();
});
