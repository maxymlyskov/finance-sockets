import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import io from "socket.io-client";
import TickersList from "../components/TickersList";
import { getData, getSaved } from "../store/slices/tickersSlice";

const socket = io.connect("http://localhost:4000");

function MainPage() {
  useEffect(() => {
    toast(
      "Click plus button to add ticker to your personal list with stopped progress."
    );
  }, []);

  const tickers = useSelector((state) => state.tickers.data);
  const saved = useSelector((state) => state.tickers.saved);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();
  const nav = useLocation();

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
    console.log(saved);

    return () =>
      socket.off("ticker", function (response) {
        dispatch(getData(response));
      });
  }, []);

  return (
    <main className="container main">
      <div className="main__container">
        <TickersList tickers={tickers} />
        {saved && (
          <div className="main__container_saved">
            {saved.map((ticker) => (
              <div
                onClick={() => navigate("/details", { state: ticker.id + 1 })}
                key={ticker.ticker}
                className="ticker ticker__saved"
              >
                <div className="ticker__title">{ticker.ticker}</div>
                <div className="ticker__right">
                  <h4>${ticker.change}</h4>
                  <h4 className="ticker__right_percent explore__ticker_change">
                    {ticker.change_percent}%
                  </h4>
                  <h4
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        getSaved(
                          saved.filter(
                            (currentTicker) => currentTicker !== ticker
                          )
                        )
                      );
                    }}
                    className="ticker__right_percent ticker__delete"
                  >
                    Delete
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <section className="main__seconds">
        <h4>Intreval: </h4>
        <button
          onClick={() => seconds > 1 && setSeconds(seconds - 1)}
          className="decrement"
        >
          -
        </button>
        <h4>{seconds}sec</h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            seconds > 1 && setSeconds(seconds + 1);
          }}
          className="increment"
        >
          +
        </button>
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default MainPage;
