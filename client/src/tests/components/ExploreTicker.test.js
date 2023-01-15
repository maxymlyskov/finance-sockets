import { render, screen } from "@testing-library/react";
import ExploreTicker from "../components/ExploreTicker";

import { expect } from "chai";

test("renders explore tickers", () => {
  render(<ExploreTicker />);

  const exploreElement = screen.getByTestId("explore");
  expect(exploreElement).toBeInDocument();
});
