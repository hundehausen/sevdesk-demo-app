import { useEffect, useState } from "react";
import { getCharts } from "../libs/api";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { fromUnixTime, format, subYears } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
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
      <Typography variant="h2">{data.name}</Typography>
      <ResponsiveContainer height={400} width="90%">
        <LineChart
          data={data.values}
          margin={{ top: 15, right: 15, left: 50, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            angle={-45}
            dataKey="x"
            domain={["dataMin", "dataMax"]}
            textAnchor="end"
            type="number"
            tickCount={20}
            tickFormatter={(unixTime) =>
              format(fromUnixTime(unixTime), "dd-MM-yyyy")
            }
          >
            <Label value="Datum" offset={70} position="bottom" />
          </XAxis>
          <YAxis domain={["auto", "auto"]}>
            <Label value={data.unit} offset={0} position="left" />
          </YAxis>
          <Tooltip
            labelFormatter={(unixTime) =>
              format(fromUnixTime(unixTime), "dd-MM-yyyy")
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
  const chartName = "market-price";
  const [timespan, setTimespan] = useState("1year");
  const [start, setStart] = useState(
    format(subYears(new Date(), 1), "yyyy-MM-dd")
  );

  // fetch all charts data from api
  useEffect(() => {
    getCharts(chartName, timespan, start).then(setCharts);
  }, [setCharts, chartName, timespan, start]);

  function handleTimeRangeChange(event) {
    setTimespan(event.target.value);
  }

  function handleDateChange(date) {
    setStart(date.toISOString());
  }

  return (
    <div>
      {charts ? <Chart data={charts} /> : null}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <FormControl>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="Start"
              value={start}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </FormControl>

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
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default BitcoinDiagramm;
