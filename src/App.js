import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [ticker, setTicker] = useState({});
  useEffect(() => {
    fetch("https://blockchain.info/ticker")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTicker(data);
      });
  }, [setTicker]);

  useEffect(() => {
    console.log("ticker", ticker);
  }, [ticker]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Bitcoin</p>
      </header>
    </div>
  );
}

export default App;
