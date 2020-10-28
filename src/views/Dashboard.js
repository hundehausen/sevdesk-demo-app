import { useEffect, useState } from "react";
import { getTicker } from "../libs/api";
import CustomTable from "../components/CustomTable";

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
        const symbol = value["symbol"];
        const last = value["last"] + " " + symbol;
        const buy = value["buy"] + " " + symbol;
        const sell = value["sell"] + " " + symbol;

        const tableEntry = { currency, last, buy, sell };
        setTableData((prevData) => [...prevData, tableEntry]);
      }
    }
  }, [ticker]);

  return (
    <div>
      {Object.keys(tableData).length !== 0 ? (
        <CustomTable data={tableData} />
      ) : null}
    </div>
  );
}

export default Dashboard;
