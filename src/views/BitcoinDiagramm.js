import { useEffect, useState } from "react";
import { getCharts } from "../libs/api";
import Container from "@material-ui/core/Container";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart({ data }) {
  return (
    <Container>
      <ResponsiveContainer height={400} width="90%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 15, left: 50, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="">
            <Label value="days" offset={0} position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="USD" offset={0} position="left" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dot={false} dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

function BitcoinDiagramm() {
  const [charts, setCharts] = useState(null);
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

  return <div>{charts ? <Chart data={charts.values} /> : null}</div>;
}

export default BitcoinDiagramm;
