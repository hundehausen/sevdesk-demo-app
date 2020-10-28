import { useEffect, useState } from "react";
import { getStats } from "../libs/api";
import SimpleCard from "../components/SimpleCard";
import Grid from "@material-ui/core/Grid";

function BitcoinDetails() {
  const [stats, setStats] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // fetch all data from api
    if (!stats) {
      getStats().then(setStats);
    }
    // get relevant data
    if (stats) {
      const marketPriceUsd = stats["market_price_usd"];
      const totalbc = stats["totalbc"];
      const marketCap = marketPriceUsd * totalbc;
      const hashrate = parseInt(stats["hash_rate"]) + " GH/s";
      const difficulty = stats["difficulty"];
      const oneDayTxCount = stats["n_tx"];
      const oneDayBtcSent = stats["total_btc_sent"] / Math.pow(10, 8);

      const data = {
        marketCap: { title: "Marktkapitalisierung", data: marketCap },
        totalbc: { title: "Umlaufende Bitcoin", data: totalbc },
        hashrate: { title: "Hashrate", data: hashrate },
        difficulty: { title: "Difficulty", data: difficulty },
        oneDayTxCount: { title: "Transaktionen in 24h", data: oneDayTxCount },
        oneDayBtcSent: {
          title: "Gesendete Bitcoin in 24h",
          data: oneDayBtcSent,
        },
      };
      setDisplayData(data);
    }
  }, [stats, setStats]);

  useEffect(() => {
    if (displayData) {
      for (const [key, value] of Object.entries(displayData)) {
        const newCard = (
          <Grid key={"GridItem: " + key} item xs={4}>
            <SimpleCard key={key} title={value.title} content={value.data} />{" "}
          </Grid>
        );
        setCards((prevCards) => [...prevCards, newCard]);
      }
    }
  }, [displayData]);

  return (
    <div>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </div>
  );
}

export default BitcoinDetails;
