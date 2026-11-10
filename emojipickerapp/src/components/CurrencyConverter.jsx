
import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedAmount, setConvertedAmount] = useState("0.00");

  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  const [statusText, setStatusText] = useState(
    "Loading available currencies..."
  );

  const [error, setError] = useState("");

  // Currency name display helper
  const getCurrencyName = (code) => {
    try {
      const displayNames = new Intl.DisplayNames(["en"], {
        type: "currency",
      });

      return displayNames.of(code) || code;
    } catch {
      return code;
    }
  };

  // 1. Load all supported currencies
  const loadCurrencyOptions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://open.er-api.com/v6/latest/USD"
      );

      if (!response.ok) {
        throw new Error("Currency API request failed");
      }

      const data = await response.json();

      if (data.result !== "success" || !data.rates) {
        throw new Error("Invalid currency API response");
      }

      const currencyCodes = Object.keys(data.rates).sort();

      setCurrencyOptions(currencyCodes);

      setStatusText(
        `Loaded ${currencyCodes.length} supported currencies.`
      );
    } catch (err) {
      console.error("Currency Loading Error:", err);

      setError("Unable to load currencies. Please try again.");
      setStatusText("Currency loading failed.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Convert selected currency
  const calculateConversion = async (signal) => {
    const numericAmount = Number(amount);

    if (amount === "" || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setConvertedAmount("0.00");
      setStatusText("Please enter a valid amount.");
      return;
    }

    if (!fromCurrency || !toCurrency) return;

    if (fromCurrency === toCurrency) {
      setConvertedAmount(numericAmount.toFixed(2));
      setStatusText(`1 ${fromCurrency} = 1 ${toCurrency}`);
      return;
    }

    setConverting(true);
    setError("");

    try {
      // Fetch rates using selected FROM currency
      const endpoint = `https://open.er-api.com/v6/latest/${fromCurrency}`;

      const response = await fetch(endpoint, { signal });

      if (!response.ok) {
        throw new Error("Conversion API request failed");
      }

      const data = await response.json();

      if (data.result !== "success" || !data.rates) {
        throw new Error("Invalid exchange rate response");
      }

      const exchangeRate = data.rates[toCurrency];

      if (typeof exchangeRate !== "number") {
        throw new Error("Selected currency rate is unavailable");
      }

      const result = numericAmount * exchangeRate;

      setConvertedAmount(result.toFixed(2));

      setStatusText(
        `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency} | Updated: ${data.time_last_update_utc}`
      );
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("Conversion Error:", err);

      setError("Unable to calculate conversion. Please try again.");
      setStatusText("Exchange rate calculation failed.");
    } finally {
      if (!signal.aborted) {
        setConverting(false);
      }
    }
  };

  // 3. Load currencies when component mounts
  useEffect(() => {
    loadCurrencyOptions();
  }, []);

  // 4. Automatically convert when values change
  useEffect(() => {
    if (loading || !currencyOptions.length) return;

    const controller = new AbortController();

    const timer = setTimeout(() => {
      calculateConversion(controller.signal);
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [amount, fromCurrency, toCurrency, loading, currencyOptions]);

  // 5. Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div
      style={{
        maxWidth: "440px",
        width: "100%",
        backgroundColor: "#0f172a",
        border: "2px solid #10b981",
        padding: "25px",
        borderRadius: "20px",
        textAlign: "center",
        margin: "0 auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 25px rgba(0,0,0,0.3)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ color: "#10b981", margin: "0 0 5px" }}>
        Live Currency Converter 💱
      </h3>

      <p
        style={{
          margin: "0 0 25px",
          fontSize: "11px",
          color: "#64748b",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        International Currency Exchange
      </p>

      {/* Amount Input */}
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <label
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            fontWeight: "bold",
            display: "block",
            marginBottom: "6px",
          }}
        >
          Enter Amount:
        </label>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={loading}
          placeholder="Enter amount..."
          style={{
            width: "100%",
            padding: "12px 15px",
            borderRadius: "8px",
            border: "1px solid #1e293b",
            backgroundColor: "#020617",
            color: "#fff",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Currency Dropdowns */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "flex-end",
        }}
      >
        {/* FROM */}
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <label
            style={{
              fontSize: "11px",
              color: "#64748b",
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            FROM:
          </label>

          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 5px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              backgroundColor: "#020617",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {currencyOptions.map((code) => (
              <option key={code} value={code}>
                {code} - {getCurrencyName(code)}
              </option>
            ))}
          </select>
        </div>

        {/* SWAP BUTTON */}
        <button
          type="button"
          onClick={swapCurrencies}
          disabled={loading}
          title="Swap currencies"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #10b981",
            backgroundColor: "#064e3b",
            color: "#10b981",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ⇄
        </button>

        {/* TO */}
        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <label
            style={{
              fontSize: "11px",
              color: "#64748b",
              fontWeight: "bold",
              display: "block",
              marginBottom: "5px",
            }}
          >
            TO:
          </label>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px 5px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              backgroundColor: "#020617",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {currencyOptions.map((code) => (
              <option key={code} value={code}>
                {code} - {getCurrencyName(code)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Converted Result */}
      <div
        style={{
          backgroundColor: "#020617",
          padding: "25px 15px",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          marginBottom: "15px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#64748b",
            display: "block",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Converted Amount
        </span>

        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#4ade80",
            marginTop: "10px",
            wordBreak: "break-word",
          }}
        >
          {loading
            ? "Loading..."
            : converting
            ? "Calculating..."
            : `${convertedAmount} ${toCurrency}`}
        </div>
      </div>

      {/* Status */}
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "12px",
          color: error ? "#f87171" : "#94a3b8",
          fontStyle: "italic",
          minHeight: "20px",
        }}
      >
        {error || statusText}
      </p>

      {/* Retry Button */}
      {error && (
        <button
          type="button"
          onClick={loadCurrencyOptions}
          style={{
            padding: "9px 18px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#10b981",
            color: "#022c22",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      )}

      <p style={{ margin: "15px 0 0", fontSize: "10px", color: "#64748b" }}>
        Rates provided by{" "}
        <a
          href="https://www.exchangerate-api.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#10b981" }}
        >
          ExchangeRate-API
        </a>
      </p>
    </div>
  );
};

export default CurrencyConverter;
