import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
    },
  },
}));

function MyBitcoin() {
  const [userBtc, setUserBtc] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const userBtcLocalStorage = localStorage.getItem("userBtc");
    if (userBtcLocalStorage) {
      setUserBtc(parseFloat(userBtcLocalStorage));
    }
  }, []);

  function handleChange(e) {
    setUserBtc(e.target.value);
  }

  function handleFormSubmit() {
    localStorage.setItem("userBtc", userBtc);
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
            value={userBtc}
            onChange={handleChange}
          />
        </FormControl>
        BTC
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          Speichern
        </Button>
      </form>
    </div>
  );
}

export default MyBitcoin;
