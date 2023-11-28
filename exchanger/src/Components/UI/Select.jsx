import { memo, useState } from "react";

const Select = ({ currency, setCurrency }) => {
  const [visibility, setVisibility] = useState(false);

  const options = [
    { code: "EUR", symbol: "€" },
    { code: "USD", symbol: "$" },
    { code: "UAH", symbol: "₴" },
  ];

  return (
    <div
      className="currency-converter__select"
      onClick={() => setVisibility(!visibility)}
    >
      {currency}
      <img
        style={visibility ? { transform: "rotate(180deg)" } : {}}
        src={require("../../assets/img/arrow.png")}
        alt=""
      />
      <div
        style={!visibility ? { display: "none" } : {}}
        className="currency-converter__options-list"
      >
        {options.map((option) => (
          <div
            key={option.code}
            onClick={() => setCurrency(option.code)}
            className="list__item"
          >
            {option.code} {option.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Select);
