import { useState, useEffect } from "react";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme();

const useStyles = makeStyles({
  form: {
    margin: theme.spacing(2),
  },
});

function BitcoinCalc({ ticker }) {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [currencies, setCurrencies] = useState([]);
  const [menuItems, setMenuItems] = useState(null);
  const [bitcoinValue, setBitcoinValue] = useState(0);
  const classes = useStyles();

  // get all currencies from ticker object
  useEffect(() => {
    if (ticker) {
      const currencies = Object.keys(ticker);
      setCurrencies(currencies);
    }
  }, [ticker]);

  // build currency Selector Items
  /* useEffect(() => {
    const items = currencies.map((currency) => (
      <MenuItem key={currency} value={currency}>
        {currency}
      </MenuItem>
    ));
    setMenuItems(items);
  }, [currencies]); */

  // calculate
  useEffect(() => {
    const price = ticker[selectedCurrency].last;
    setBitcoinValue(amount / price);
  }, [amount, selectedCurrency, setBitcoinValue, ticker]);

  function handleValueChange(e) {
    setAmount(e.target.value);
  }
  function handleCurrencyChange(e) {
    setSelectedCurrency(e.target.value);
  }

  return (
    <Container>
      <Header title="Bitcoin Umrechner" />
      <form noValidate autoComplete="off">
        <FormControl margin="normal" className={classes.form}>
          <InputLabel htmlFor="amount">Betrag</InputLabel>
          <Input
            id="amount"
            aria-describedby="amount"
            variant="outlined"
            value={amount}
            onChange={(e) => handleValueChange(e)}
          />
        </FormControl>
        <FormControl margin="normal" className={classes.form}>
          <Select
            id="currency-select"
            variant="outlined"
            value={selectedCurrency}
            onChange={(e) => handleCurrencyChange(e)}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography>=</Typography>

        <FormControl margin="normal" className={classes.form}>
          <TextField
            id="outlined-basic"
            label="BTC"
            variant="outlined"
            value={bitcoinValue}
          />
        </FormControl>
      </form>
    </Container>
  );
}

export default BitcoinCalc;
