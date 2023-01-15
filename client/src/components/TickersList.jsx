import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSaved } from "../store/slices/tickersSlice";

function TickersList({ tickers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.tickers.saved);

  return (
    <section className="tickers-list">
      {tickers.map((ticker, index) => (
        <div
          onClick={() => navigate("/details", { state: index + 1 })}
          key={ticker.ticker}
          className="ticker"
        >
          <div className="tickers-list__indicator">{ticker.ticker}</div>
          <div className="ticker__right">
            <h4>${ticker.change}</h4>
            <h4 className="ticker__right_percent explore__ticker_change">
              {ticker.change_percent}%
            </h4>
            <div
              onClick={(e) => {
                e.stopPropagation();
                !saved.includes(ticker) &&
                  dispatch(getSaved(saved.concat([{ ...ticker, id: index }])));
              }}
              className="ticker__right_plus"
            >
              +
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default TickersList;
