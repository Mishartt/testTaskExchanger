const Header = ({ exchangeRates }) => {
  if (exchangeRates === null) {
    return "Loading";
  }
  return (
    <header>
      <div className="header__currency-item">
        <p>
          {exchangeRates[0].cc}{" "}
          <span>{Number(exchangeRates[0].rate).toFixed(2)}</span>
        </p>
      </div>
      <div className="header__currency-item">
        <p>
          {exchangeRates[1].cc}{" "}
          <span>{Number(exchangeRates[1].rate).toFixed(2)}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
