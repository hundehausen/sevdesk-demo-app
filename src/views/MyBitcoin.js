import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function MyBitcoin() {
  const [userBtc, setUserBtc] = useState(0);
  const [userBtcInput, setUserBtcInput] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const userBtcLocalStorage = localStorage.getItem("userBtc");
    if (userBtcLocalStorage) {
      setUserBtc(userBtcLocalStorage);
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
      <Card className={classes.root}>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <label>
              Your BTC amount:
              <input name="userBtc" value={userBtc} onChange={handleChange} />
            </label>
            <button type="submit">Save</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyBitcoin;
