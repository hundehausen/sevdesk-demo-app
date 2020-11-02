import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";

import CustomTable from "../components/CustomTable";
import Header from "../components/Header";

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
      <Header title="Dashboard" />
      <Container>
        {Object.keys(tableData).length !== 0 ? (
          <CustomTable data={tableData} />
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;
