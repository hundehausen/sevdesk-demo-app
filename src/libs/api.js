import axios from "axios";

const instance = axios.create({
  baseURL: "https://blockchain.info",
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

async function getTotalBc() {
  return instance
    .get("/q/totalbc", { params: { cors: true } })
    .then((res) => {
      console.log("Res", res.data);
      return res.data;
    })
    .catch((error) => console.error(error));
}

export { getTicker, getTotalBc };
