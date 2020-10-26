import axios from "axios";

const instance = axios.create({
  baseURL: "https://blockchain.info/ticker",
  timeout: 1000,
  headers: {},
});
