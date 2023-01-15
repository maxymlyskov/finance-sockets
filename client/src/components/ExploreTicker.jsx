import React from "react";
import { useNavigate } from "react-router-dom";

function ExploreTicker({ tickers }) {
  const navigate = useNavigate();

  return (
    <section className="explore">
      {tickers.map((ticker, index) => (
        <article
          onClick={() => {
            navigate("/details", { state: index + 1 });
          }}
          className="explore__ticker"
        >
          <h4>{ticker.ticker}</h4>
          <h5 className="ticker__right_percent ticker-details__percent explore__ticker_change">
            ${ticker.change}
          </h5>
        </article>
      ))}
    </section>
  );
}

export default ExploreTicker;
