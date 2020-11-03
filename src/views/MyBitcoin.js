import { useState, useEffect } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Header from "../components/Header";

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

function MyBitcoin() {
  const [userBtc, setUserBtc] = useState(0);
  const [userBtcInput, setUserBtcInput] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const userBtcLocalStorage = localStorage.getItem("userBtc");
    if (userBtcLocalStorage) {
      setUserBtc(parseFloat(userBtcLocalStorage));
      setUserBtcInput(parseFloat(userBtcLocalStorage));
    }
  }, [setUserBtc]);

  function handleChange(e) {
    setUserBtcInput(e.target.value);
  }

  function handleFormSubmit() {
    setUserBtc(userBtcInput);
    localStorage.setItem("userBtc", userBtcInput);
  }

  return (
    <div>
      <Header title="Meine Bitcoin" />
      <form className={classes.root}>
        <FormControl>
          <InputLabel htmlFor="user-btc-label">
            Dein Bitcoin Guthaben
          </InputLabel>
          <Input
            id="user-btc-label"
            name="userBtc"
            value={userBtcInput}
            onChange={handleChange}
          />
        </FormControl>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          Speichern
        </Button>
      </form>
    </div>
  );
}

export default MyBitcoin;
