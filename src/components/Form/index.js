import React, { useState } from "react";
import styles from "./styles.module.css";
import useGetCurrencyList from "../../commonHooks/getCurrencyList.js";
import useGetExchange from "../../commonHooks/getExchange.js";
import Result from '../../components/Result';


const Form = ({ data }) => {
  const { data: currencyData, loading: currencyLoading } = useGetCurrencyList();
  const { data: result, trigger, loading: apiLoading } = useGetExchange();
  const [crypto, setCrypto] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = false;
    if (!crypto) {
      setError((p) => ({ ...p, crypto: "Select cryptocurrency" }));
      flag = true;
    }
    if (!amount) {
      setError((p) => ({ ...p, amount: "Amount cannot be empty!" }));
      flag = true;
    } else if (isNaN(amount)) {
      setError((p) => ({ ...p, amount: "Amount is invalid!" }));
      flag = true;
    }
    if (!currency) {
      setError((p) => ({ ...p, currency: "Select currency" }));
      flag = true;
    }

    if (flag) return;
    trigger({
      id: Number(crypto),
      currency,
      amount: Number(amount),
    });
  };

  // handle reset
  const handleReset = (e) => {
    e.preventDefault();

    setCurrency("USD");
    setCrypto("");
    setAmount("");
    setError(null);
  };
  if (currencyLoading) return null;
  return (
    <div className={styles.form_container}>
      <h2>CryptoCurrency Amount Calculator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Choose Crypto Currency
          <select
            className={styles.styledSelect}
            value={crypto}
            onChange={(e) => {
              setError(null);
              setCrypto(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              {"Select Crypto"}
            </option>

            {(data || [])?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} ({option.symbol})
              </option>
            ))}
          </select>
          {error?.crypto ? (
            <div className={styles.error}>{error.crypto}</div>
          ) : null}
        </label>

        <label>
          Input Amount
          <input
            className={styles.styledInput}
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              setError(null);
              setAmount(e.target.value);
            }}
          />
          {error?.amount ? (
            <div className={styles.error}>{error.amount}</div>
          ) : null}
        </label>

        <label>
          Preferred Currency
          <select
            className={styles.styledSelect}
            value={currency}
            onChange={(e) => {
              setError(null);
              setCurrency(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              {"Select Currency"}
            </option>

            {(currencyData || [])?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error?.currency ? (
            <div className={styles.error}>{error.currency}</div>
          ) : null}
        </label>

        <div className={styles.button_container}>
          <button type="submit" disabled={apiLoading}>
            {" "}
            {apiLoading ? (
             'Calculating...'
            ) : (
              "Calculate Result"
            )}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      {!!result?<Result result={result} />:null}
    </div>
  );
};

export default Form;
