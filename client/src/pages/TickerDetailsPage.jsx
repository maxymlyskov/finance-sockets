import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ExploreTicker from "../components/ExploreTicker";

function TickersDetailsPage({ tickers }) {
  const nav = useLocation();
  const ticker = useSelector((state) => state.tickers.data[nav.state]);
  const tickersData = useSelector((state) => state.tickers.data);
  const [previousDate, setPreviousDate] = useState(ticker);
  const [color, setColor] = useState("#a50e0e");
  const [backroundColor, setBackroundColor] = useState("#fce8e6");
  const [prices, setPrices] = useState([ticker.change]);

  useEffect(() => {
    setPrices((currentPrices) => [...currentPrices, ticker.change]);
    console.log(prices);
  }, [ticker]);

  useEffect(() => {
    if (previousDate.change_percent <= ticker.change_percent) {
      setColor("#137333");
      setBackroundColor("#e6f4ea");
    } else {
      setColor("#a50e0e");
      setBackroundColor("#fce8e6");
    }
    setPreviousDate(ticker);
  }, [ticker]);

  return (
    <main className="ticker-details">
      <div>
        <h3 className="ticker-details__title">
          {ticker.ticker} · {ticker.exchange}
        </h3>
        <div className="ticker-details__price">
          <h3>${ticker.change}</h3>
          <h4
            style={{ backgroundColor: backroundColor, color: color }}
            className="ticker__right_percent ticker-details__percent"
          >
            {ticker.change_percent}%
          </h4>
          <h4 className="ticker-details__yield">{ticker.yield} yield</h4>
        </div>
        <p className="ticker-details__date">
          {new Date(ticker.last_trade_time).toLocaleString()}
        </p>
        <LineChart
          width={350}
          height={200}
          data={prices.map((price) => ({
            name: price,
            uv: price,
            pv: 2400 - price,
            amt: 2400 - price,
          }))}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
        </LineChart>
      </div>
      <div>
        <h4 className="ticker-details__original">
          Original price:{" "}
          <div className="ticker__right_percent ticker-details__percent ticker-details__original_price">
            ${ticker.price}
          </div>
        </h4>
        <h4 className="ticker-details__original ticker-details__dividend">
          Dividend:{" "}
          <div className="ticker__right_percent ticker-details__percent ticker-details__original_price">
            {ticker.dividend}
          </div>
        </h4>
        <h4>Explore: </h4>
        <ExploreTicker tickers={tickersData} />
      </div>
    </main>
  );
}

export default TickersDetailsPage;
