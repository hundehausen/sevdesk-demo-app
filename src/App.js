import "./App.css";
import { useEffect, useState } from "react";
import {
  BitcoinCalc,
  BitcoinDetails,
  BitcoinDiagramm,
  Dashboard,
} from "./views";
import Nav from "./components/Nav";

function App() {
  const [view, setView] = useState(0);

  return (
    <div className="App">
      {view === 0 ? <Dashboard /> : null}
      {view === 1 ? <BitcoinDetails /> : null}
      {view === 2 ? <BitcoinCalc /> : null}
      {view === 3 ? <BitcoinDiagramm /> : null}
      <Nav view={view} setView={setView} />
    </div>
  );
}

export default App;
