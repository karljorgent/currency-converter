import { useEffect, useState } from "react";
import CurrencyPrices from "./CurrencyPrices";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");


function App() {

    const fetchCurrencies = () => {
        fetch("http://localhost:8080/currencies")
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              setRates(response);
            });
      }

    // getting currency rates from db.json
    const [rates, setRates] = useState([]);

    useEffect(() => {
        fetchCurrencies()
        socket.on("recive_rates", () => {
          fetchCurrencies()
        });
      }, [socket]);

    // redirect to login page

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `login`;
        navigate(path);
    }



    return (
        <div className="App">
            <button type='button' onClick={routeChange}>Log In</button>
            <h1>Currency rates</h1>
            {rates.map(cur => (
                <div className="currencyBox" key={cur.id}>
                    <CurrencyPrices
                        name={cur.name}
                        bid={cur.bid}
                        ask={cur.ask}
                    />
                </div>
            ))}
        </div>
    );
}

export default App;
