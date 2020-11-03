import { Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import CustomTable from "../components/CustomTable";
import Header from "../components/Header";

function Dashboard({ ticker }) {
  const [tableData, setTableData] = useState([]);
  const [userBtc, setUserBtc] = useState(0);
  const [userEur, setUserEur] = useState(0);

  useEffect(() => {
    if (ticker) {
      const tableEntries = Object.entries(ticker).map(([currency, value]) => {
        const symbol = value.symbol;
        const last = `${value.last} ${symbol}`;
        const buy = `${value.buy} ${symbol}`;
        const sell = `${value.sell} ${symbol}`;

        return { currency, last, buy, sell };
      });
      setTableData(tableEntries);
    }
  }, [ticker]);

  useEffect(() => {
    const userBtcLocalStorage = localStorage.getItem("userBtc");
    if (userBtcLocalStorage && ticker) {
      setUserBtc(parseFloat(userBtcLocalStorage));
      const eurPrice = ticker["EUR"].last;
      const usrEur = (
        parseFloat(userBtcLocalStorage) * eurPrice
      ).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
      setUserEur(usrEur);
    }
  }, [setUserBtc, ticker]);

  return (
    <div>
      <Header title="Dashboard" />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {tableData.length ? (
          <Grid item xs={12}>
            <Container>
              <CustomTable data={tableData} />
            </Container>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Typography variant="h4">Mein Bitcoin Guthaben</Typography>
          <Typography color="textSecondary">{userBtc} BTC</Typography>
          <Typography color="textSecondary">{userEur}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
