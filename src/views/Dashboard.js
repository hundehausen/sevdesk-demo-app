import { useEffect, useState } from "react";

import CustomTable from "../components/CustomTable";

function Dashboard({ ticker }) {
  const [tableData, setTableData] = useState([]);

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
