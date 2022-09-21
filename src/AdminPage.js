import CurrencyPrices from "./CurrencyPrices";
import {useEffect, useState} from "react";

function AdminPage() {

    // getting currency rates from db.json
    const [rates, setRates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/currencies')
            .then(response => {return response.json()})
            .then(response => {
                setRates(response)
                ;
            })
    })

    const addCurrency = () => {
        console.log("aljo")
    }

    return (
        <div className="AdminStuff">
            <button type='button' onClick={addCurrency}>Add currency</button>
            <h1>Currency rates</h1>
            {rates.map(cur => (
                <CurrencyPrices
                    name={cur.name}
                    bid={cur.bid}
                    ask={cur.ask}
                />
            ))}
        </div>
    )
}

export default AdminPage;