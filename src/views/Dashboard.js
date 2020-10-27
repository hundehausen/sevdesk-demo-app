import React from "react";
import { useEffect, useState } from "react";
import { getTicker } from "../libs/api";
function Dashboard() {
  const [ticker, setTicker] = useState(null);

  // fetch all data from api
  useEffect(() => {
    getTicker().then(setTicker);
  }, [setTicker]);
  return <div></div>;
}

export default Dashboard;
