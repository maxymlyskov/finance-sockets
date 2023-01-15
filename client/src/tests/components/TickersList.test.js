import { render, screen } from "@testing-library/react";
import TickersList from "../components/TickersList";

import { expect } from "chai";

test("renders routes", () => {
  render(<TickersList />);

  const listElement = screen.getByTestId("list");
  expect(listElement).toBeInDocument();
});
