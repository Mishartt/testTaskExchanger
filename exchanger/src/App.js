import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import axios from "axios";
import Сonverter from "./Components/Сonverter";

function App() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const requiredCurrencies = ["USD", "EUR"];

  const fetchCurrencyRates = async () => {
    axios
      .get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then((resp) => {
        const filteredData = resp.data.filter((el) =>
          requiredCurrencies.includes(el.cc)
        );
        setExchangeRates([...filteredData, { cc: "UAH", rate: 1 }]);
      })
      .catch((err) => console.log(`fetch err ${err}`));
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);
  return (
    <div className="App">
      <Header exchangeRates={exchangeRates} />
      <div className="container">
        <Сonverter exchangeRates={exchangeRates} />
      </div>
    </div>
  );
}

export default App;
