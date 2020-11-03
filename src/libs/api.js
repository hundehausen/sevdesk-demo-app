import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.blockchain.info",
  timeout: 1000,
  responseType: "json",
  params: { cors: true },
});

async function getTicker() {
  return instance
    .get("/ticker")
    .then((res) => res.data)
    .catch((error) => console.error(error));
}

async function getStats() {
  return instance
    .get("/stats")
    .then((res) => res.data)
    .catch((error) => console.error(error));
}

async function getCharts(chartName, timespan, start) {
  return instance
    .get(`/charts/${chartName}`, { params: { timespan, start } })
    .then((res) => res.data)
    .catch((error) => console.error(error));
}

export { getTicker, getStats, getCharts };
