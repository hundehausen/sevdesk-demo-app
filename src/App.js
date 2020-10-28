import "./App.css";
import { useEffect, useState } from "react";
import {
  BitcoinCalc,
  BitcoinDetails,
  BitcoinDiagramm,
  Dashboard,
} from "./views";
import Nav from "./components/Nav";
import { getTicker, getStats } from "./libs/api";

function App() {
  const [view, setView] = useState(0);
  const [ticker, setTicker] = useState(null);
  const [stats, setStats] = useState(null);

  // fetch all ticker data from api
  useEffect(() => {
    if (!ticker) {
      getTicker().then(setTicker);
    }
  }, [ticker, setTicker]);

  // fetch all stats data from api
  useEffect(() => {
    if (!stats) {
      getStats().then(setStats);
    }
  }, [stats, setStats]);

  return (
    <div className="App">
      {view === 0 ? <Dashboard ticker={ticker} /> : null}
      {view === 1 ? <BitcoinDetails stats={stats} /> : null}
      {view === 2 ? <BitcoinCalc /> : null}
      {view === 3 ? <BitcoinDiagramm /> : null}
      <Nav view={view} setView={setView} />
    </div>
  );
}

export default App;
