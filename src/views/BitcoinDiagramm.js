import { useEffect, useState } from "react";
import { getCharts } from "../libs/api";
import Header from "../components/Header";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
import { Typography } from "@material-ui/core";

function Chart({ data }) {
  return (
    <Container>
      <ResponsiveContainer height={400} width="90%">
        <Typography variant="h3">{data.name}</Typography>
        <LineChart
          data={data.values}
          margin={{ top: 15, right: 15, left: 50, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="">
            <Label value="Tage" offset={0} position="bottom" />
          </XAxis>
          <YAxis>
            <Label value={data.unit} offset={0} position="left" />
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
    getCharts(chartName, timespan, start).then(setCharts);
  }, [setCharts, chartName, timespan, start]);

  useEffect(() => {
    if (charts) {
      console.log("charts", charts);
    }
  }, [charts]);

  function handleTimeRangeChange(event) {
    setTimespan(event.target.value);
    console.log("event.target.value", event.target.value);
  }

  return (
    <div>
      <Header title="Bitcoin Charts" />
      <FormControl>
        <InputLabel id="zeitraum-label">Zeitraum</InputLabel>
        <Select
          labelId="zeitraum-label"
          id="zeitraum"
          value={timespan}
          onChange={handleTimeRangeChange}
        >
          <MenuItem value={"1weeks"}>1 Woche</MenuItem>
          <MenuItem value={"1months"}>1 Monat</MenuItem>
          <MenuItem value={"3months"}>3 Monate</MenuItem>
          <MenuItem value={"6months"}>6 Monate</MenuItem>
          <MenuItem value={"1year"}>1 Jahr</MenuItem>
        </Select>
      </FormControl>
      {charts ? <Chart data={charts} /> : null}
    </div>
  );
}

export default BitcoinDiagramm;
