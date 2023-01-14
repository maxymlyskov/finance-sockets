import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";
import TickersList from "../components/TickersList";
import { getData } from "../store/slices/tickersSlice";

const socket = io.connect("http://localhost:4000");

function MainPage() {
  const tickers = useSelector((state) => state.tickers.data);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", function (response) {
      !tickers
        ? setTimeout(() => {
            dispatch(getData(response));
          }, 1000 * seconds)
        : dispatch(getData(response));
    });
    console.log(tickers);

    return () =>
      socket.off("ticker", function (response) {
        dispatch(getData(response));
      });
  }, []);

  return (
    <main className="main">
      <TickersList tickers={tickers} />
      <section className="main__seconds">
        <button
          onClick={() => seconds > 1 && setSeconds(seconds - 1)}
          className="decrement"
        >
          -
        </button>
        <h4>{seconds}sec</h4>
        <button
          onClick={() => seconds > 1 && setSeconds(seconds + 1)}
          className="increment"
        >
          +
        </button>
      </section>
    </main>
  );
}

export default MainPage;
