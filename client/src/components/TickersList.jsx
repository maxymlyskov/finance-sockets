import React from "react";
import { useNavigate } from "react-router-dom";

function TickersList({ tickers }) {
  const navigate = useNavigate();

  return (
    <section className="tickers-list">
      {tickers.map((ticker, index) => (
        <div
          onClick={() => navigate("/details", { state: index })}
          key={ticker.ticker}
          className="ticker"
        >
          <div className="tickers-list__indicator">{ticker.ticker}</div>
          <div className="ticker__right">
            <h4>${ticker.change}</h4>
            <h4 className="ticker__right_percent explore__ticker_change">
              {ticker.change_percent}%
            </h4>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TickersList;
