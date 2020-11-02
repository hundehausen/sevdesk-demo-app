import { useEffect, useState } from "react";
import { getCharts } from "../libs/api";
import moment from "moment";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Chart({ data }) {
  return (
    <Container>
      <Typography variant="h3">{data.name}</Typography>
      <ResponsiveContainer height={400} width="90%">
        <LineChart
          data={data.values}
          margin={{ top: 15, right: 15, left: 50, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            angle={-45}
            dataKey="x"
            domain={["auto", "auto"]}
            textAnchor="end"
            type="number"
            tickCount={20}
            tickFormatter={(unixTime) =>
              moment.unix(unixTime).format("DD-MM-YYYY")
            }
          >
            <Label value="Datum" offset={70} position="bottom" />
          </XAxis>
          <YAxis domain={["auto", "auto"]}>
            <Label value={data.unit} offset={0} position="left" />
          </YAxis>
          <Tooltip
            labelFormatter={(unixTime) =>
              moment.unix(unixTime).format("DD-MM-YYYY")
            }
          />
          <Line
            type="monotone"
            dot={false}
            dataKey="y"
            name="USD/BTC"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

function BitcoinDiagramm() {
  const [charts, setCharts] = useState({ name: "", unit: "", values: [] });
  const [chartName, setChartName] = useState("market-price");
  const [timespan, setTimespan] = useState("1year");
  const [start, setStart] = useState("");

  // fetch all charts data from api
  useEffect(() => {
    getCharts(chartName, timespan, start).then(setCharts);
  }, [setCharts, chartName, timespan, start]);

  function handleTimeRangeChange(event) {
    setTimespan(event.target.value);
  }

  return (
    <div>
      {charts ? <Chart data={charts} /> : null}
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
    </div>
  );
}

export default BitcoinDiagramm;
