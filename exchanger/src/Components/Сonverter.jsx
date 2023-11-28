import { useEffect, useMemo, useState } from "react";
import Select from "./UI/Select";

const Сonverter = ({ exchangeRates }) => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("UAH");
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);

  //if this were a real converter I would round down rather than use toFixed()

  const change1 = (value) => {
    if (exchangeRates === null) {
      return;
    }
    setValue1(value);
    if (value === "") {
      setValue2("");
      return;
    }
    const rate1 = exchangeRates.find((item) => item.cc === currency2).rate;
    const rate2 = exchangeRates.find((item) => item.cc === currency1).rate;
    const convertedValue = (value / rate1) * rate2;
    setValue2(convertedValue.toFixed(2));
  };

  const change2 = (value) => {
    if (exchangeRates === null) {
      return;
    }
    setValue2(value);
    if (value === "") {
      setValue1("");
      return;
    }
    const rate1 = exchangeRates.find((item) => item.cc === currency1).rate;
    const rate2 = exchangeRates.find((item) => item.cc === currency2).rate;
    const convertedValue = (value / rate1) * rate2;
    setValue1(convertedValue.toFixed(2));
  };

  useEffect(() => {
    change1(value1);
  }, [currency1]);

  useEffect(() => {
    change1(value1);

    ///when changing currency2,i intentionally recalculate value2 relative to value1 )
  }, [currency2]);

  useEffect(() => {
    if (exchangeRates === null) {
      return;
    }
    const rate1 = exchangeRates.find((item) => item.cc === currency1).rate;
    const rate2 = exchangeRates.find((item) => item.cc === currency2).rate;
    setCurrentExchangeRate((rate1 / rate2).toFixed(3));
  }, [currency1, currency2, exchangeRates]);

  return (
    <div className="currency-converter">
      <div className="currency-converter__item">
        <Select currency={currency1} setCurrency={setCurrency1} />
        <input
          onChange={(e) => change1(e.target.value)}
          value={value1}
          className="currency-converter__input"
          type="number"
          placeholder="200.00"
        />
      </div>
      <div className="currency-converter__current-rate">
        <p>
          1 {currency1} = {currentExchangeRate}
          {currency2}
        </p>
      </div>
      <div className="currency-converter__item">
        <Select currency={currency2} setCurrency={setCurrency2} />
        <input
          onChange={(e) => change2(e.target.value)}
          value={value2}
          className="currency-converter__input"
          type="number"
          placeholder="200.00"
        />
      </div>
    </div>
  );
};

export default Сonverter;
