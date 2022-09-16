import './App.css';
import {useEffect, useState} from "react";
import CurrencyPrices from "./CurrencyPrices";

function App() {

    // getting currency rates from api.js
    const [rates, setRates] = useState([]);

    useEffect(() => {
          fetch('http://localhost:8800/currencies')
              .then(response => {return response.json()})
              .then(response => {
                  setRates(response)
                  ;
              })
    })

    return (
        <div className="App">
            <h1>Currency rates</h1>
            {rates.map(cur => (
                <CurrencyPrices
                    name={cur.name}
                    bid={cur.bid}
                    ask={cur.ask}
                />
            ))}
        </div>
    );
}

export default App;
