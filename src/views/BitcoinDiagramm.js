import { useEffect, useState } from "react";
import { getCharts } from "../libs/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function BitcoinDiagramm() {
  const [charts, setCharts] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartName, setChartName] = useState("market-price");
  const [timespan, setTimespan] = useState("1year");
  const [start, setStart] = useState("");

  // fetch all charts data from api
  useEffect(() => {
    if (!charts) {
      getCharts(chartName, timespan, start).then(setCharts);
    }
  }, [charts, setCharts, chartName, timespan, start]);

  useEffect(() => {
    if (charts) {
      console.log("charts", charts);
    }
  }, [charts]);

  return <div></div>;
}

export default BitcoinDiagramm;
