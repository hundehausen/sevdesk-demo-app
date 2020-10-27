import React from "react";
import { useEffect, useState } from "react";
import { getTicker } from "../libs/api";
import Table from "../components/Table";

function Dashboard() {
  const [ticker, setTicker] = useState(null);
  const [tableData, setTableData] = useState([]);

  // fetch all data from api
  useEffect(() => {
    if (!ticker) {
      getTicker().then(setTicker);
    }
  }, [ticker, setTicker]);

  useEffect(() => {
    if (ticker) {
      for (const [currency, value] of Object.entries(ticker)) {
        const last = value["last"];
        const buy = value["buy"];
        const sell = value["sell"];
        const symbol = value["symbol"];
        const tableEntry = { currency, last, buy, sell, symbol };
        setTableData((prevData) => [...prevData, tableEntry]);
      }
    }
  }, [ticker]);

  useEffect(() => {
    console.log("tableData", tableData);
  });

  return <div>{JSON.stringify(ticker)}</div>;
}

export default Dashboard;
