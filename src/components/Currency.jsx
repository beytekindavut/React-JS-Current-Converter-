import React, { useState } from "react";
import "../css/currency.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_Y7zpyoba9cpnSRglE4xX227p13ry7MjELw9Sp2Wx";

// Flags
const flags = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  TRY: "🇹🇷"
};

function Currency() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const exchange = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );

      const calc = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(calc);

    } catch (err) {
      alert("Bir hata olustu!");
    }
     finally {
      setLoading(false);
    }
  };

  // Swap işlemi
  const swap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);

    const tempAmount = amount;
    setAmount(result);
    setResult(tempAmount);
  };

  return (

    <div className="currency-container">

      <h2 className="title">💱 Bayrak Ikonlu Modern Doviz Cevirici</h2>

      <div className="card">

        <div className="inputs">
          {/* Amount */}
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="input amount"
            placeholder="Amount"
          />

          {/* FROM Currency */}
          <div className="flag-select">

            <span className="flag">{flags[fromCurrency]}</span>

            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="select flag-select-box">

              <option value="USD">USD 🇺🇸</option>
              <option value="EUR">EUR 🇪🇺</option>
              <option value="TRY">TRY 🇹🇷</option>

            </select>

          </div>

          <FaCircleArrowRight className="arrow" />



          {/* TO Currency */}
          <div className="flag-select">

            <span className="flag">{flags[toCurrency]}</span>

            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="select flag-select-box">

              <option value="TRY">TRY 🇹🇷</option>
              <option value="EUR">EUR 🇪🇺</option>
              <option value="USD">USD 🇺🇸</option>

            </select>

          </div>



          {/* Result */}
          <input
            value={result}
            disabled
            type="number"
            className="input result"
            placeholder="Result"
          />
        </div>


        <button className="swap-btn" onClick={swap}>⇄ Swap</button>


        <button onClick={exchange} className="btn" disabled={loading}>
          {loading ? "Hesaplaniyor..." : "Cevir"}
        </button>

      </div>



    </div>

  );
}

export default Currency;
