import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { LineChart, Line, CartesianGrid, Tooltip } from "recharts";
import ExploreTicker from "../components/ExploreTicker";

function TickersDetailsPage({ tickers }) {
  const nav = useLocation();
  let { width } = useWindowDimensions();

  const ticker = useSelector((state) => state.tickers.data[nav.state - 1]);
  const [currentTicker, setCurrentTicker] = useState(ticker);
  const tickersData = useSelector((state) => state.tickers.data);
  const [previousDate, setPreviousDate] = useState(ticker);
  const [color, setColor] = useState("#a50e0e");
  const [backroundColor, setBackroundColor] = useState("#fce8e6");
  const [prices, setPrices] = useState([ticker.change]);
  const [chart, setChart] = useState(350);

  useEffect(() => {
    setPrices((currentPrices) => [...currentPrices, ticker.change]);
    console.log(prices);

    if (ticker.ticker !== currentTicker.ticker) {
      setPrices([]);
      setCurrentTicker(ticker);
    }
  }, [ticker]);

  useEffect(() => {
    width >= 768 ? setChart(600) : setChart(350);
  }, [width]);

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
          width={chart}
          height={chart - 150}
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
        <div className="ticker-details__original_container">
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
        </div>
        <h4>Explore: </h4>
        <ExploreTicker tickers={tickersData} />
        <section className="about-details">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            ullam ab itaque maxime nulla perferendis exercitationem, inventore
            error temporibus doloribus! Animi, obcaecati beatae deleniti modi
            dolor nisi excepturi voluptatem unde, provident, minus velit quod
            totam? Veritatis facere debitis quaerat voluptas explicabo eligendi
            magni minima nobis? Aperiam doloremque nesciunt mollitia
            perferendis.
          </p>
        </section>
      </div>
    </main>
  );
}

export default TickersDetailsPage;
