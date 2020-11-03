import { useEffect, useState } from "react";
import SimpleCard from "../components/SimpleCard";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

function BitcoinDetails({ stats }) {
  const [displayData, setDisplayData] = useState({});

  useEffect(() => {
    // get relevant data
    if (stats) {
      const marketPriceUsd = stats["market_price_usd"];
      const totalbc = stats["totalbc"] / Math.pow(10, 8);
      const marketCap =
        (marketPriceUsd * totalbc).toLocaleString({
          currency: "USD",
        }) + " USD";
      const hashrate = parseInt(stats["hash_rate"]).toLocaleString() + " GH/s";
      const difficulty = stats["difficulty"];
      const oneDayTxCount = stats["n_tx"];
      const oneDayBtcSent = stats["total_btc_sent"] / Math.pow(10, 8);

      const data = {
        marketCap: { title: "Marktkapitalisierung", data: marketCap },
        totalbc: {
          title: "Umlaufende Bitcoin",
          data: totalbc.toLocaleString(),
        },
        hashrate: { title: "Hashrate", data: hashrate.toLocaleString() },
        difficulty: { title: "Difficulty", data: difficulty.toLocaleString() },
        oneDayTxCount: {
          title: "Transaktionen in 24h",
          data: oneDayTxCount.toLocaleString(),
        },
        oneDayBtcSent: {
          title: "Gesendete Bitcoin in 24h",
          data: oneDayBtcSent.toLocaleString(),
        },
      };
      setDisplayData(data);
    }
  }, [stats]);

  function renderCards() {
    return Object.entries(displayData).map(([key, value]) => (
      <Grid item key={"GridItem: " + key} md={4} sm={6} xs={12}>
        <SimpleCard key={key} title={value.title} content={value.data} />
      </Grid>
    ));
  }

  return (
    <Container>
      <Header title="Bitcoin Details" />
      <Grid container spacing={3}>
        {renderCards()}
      </Grid>
    </Container>
  );
}

export default BitcoinDetails;
