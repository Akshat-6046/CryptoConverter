import "./App.css";
import React from "react";
import useGetCryptoList from "./commonHooks/getCryptoList";
import Status from "./components/Status";
import Form from "./components/Form";
function App() {
  const { data, loading } = useGetCryptoList();

  return (
    <div className="App">
      <header className="App-header">Crypto Calculator</header>
      {!loading ? <Status data={data} /> : null}
      <div className="formContent">
        <Form data={data} />
      </div>
    </div>
  );
}

export default App;
