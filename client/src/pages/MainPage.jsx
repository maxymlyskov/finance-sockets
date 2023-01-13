import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function MainPage() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    socket.emit("start");
    socket.on("ticker", function (response) {
      setTickers(response);
    });
    console.log(tickers);

    return () => socket.disconnect();
  }, [tickers]);

  return (
    <main className="main">
      {tickers.map((ticker) => (
        <h1 key={ticker.ticker}>{ticker.price}</h1>
      ))}
    </main>
  );
}

export default MainPage;
