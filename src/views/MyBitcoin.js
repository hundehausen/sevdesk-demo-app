import { useState, useEffect } from "react";
import Header from "../components/Header";

function MyBitcoin() {
  const [userBtc, setUserBtc] = useState(null);
  const [userBtcInput, setUserBtcInput] = useState(0);

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
      <form onSubmit={handleFormSubmit}>
        <label>
          Your BTC amount:
          <input name="userBtc" value={userBtc} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default MyBitcoin;
