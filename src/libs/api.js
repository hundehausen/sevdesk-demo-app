import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.blockchain.info",
  timeout: 1000,
  responseType: "json",
});

async function getTicker() {
  return instance
    .get("/ticker", { params: { cors: true } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
}

async function getStats() {
  return instance
    .get("/stats", { params: { cors: true } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
}

export { getTicker, getStats };
