import { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

function BitcoinCalc({ ticker }) {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [menuItems, setMenuItems] = useState(null);
  const [bitcoinValue, setBitcoinValue] = useState(0);

  // get all currencies from ticker object
  useEffect(() => {
    if (ticker) {
      const currencies = Object.keys(ticker);
      setCurrencies(currencies);
    }
  }, [ticker]);

  // build currency Selector Items
  useEffect(() => {
    if (currencies.length > 0) {
      const items = currencies.map((currency) => (
        <MenuItem key={currency} value={currency}>
          {currency}
        </MenuItem>
      ));
      setMenuItems(items);
    }
  }, [currencies]);

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
    <form noValidate autoComplete="off">
      <FormControl margin="normal">
        <InputLabel htmlFor="amount">Amount:</InputLabel>
        <Input
          id="amount"
          aria-describedby="amount"
          variant="outlined"
          value={amount}
          onChange={(e) => handleValueChange(e)}
        />
      </FormControl>
      <FormControl margin="normal">
        <Select
          id="currency-select"
          variant="outlined"
          defaultValue={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e)}
        >
          {menuItems}
        </Select>
      </FormControl>
      <FormControl margin="normal">
        <TextField
          id="outlined-basic"
          label="BTC"
          variant="outlined"
          value={bitcoinValue}
        />
      </FormControl>
    </form>
  );
}

export default BitcoinCalc;
