import CurrencyPrices from "./CurrencyPrices";
import {useEffect, useState} from "react";
import CreateCurrencies from "./components/CreateCurrencies";

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

    const addCurrency = (event) => {
        event.preventDefault();
        CreateCurrencies(event.target.form[0].value, event.target.form[1].value, event.target.form[2].value)

    }

    return (
        <div className="AdminStuff">
            <form>
                Name:
                <input type="text" name="name" placeholder="name" />
                Bid:
                <input type="text" name="name" placeholder="bid" />
                Ask:
                <input type="text" name="name" placeholder="ask" />
                <input type="submit" value="Add Currency" onClick={addCurrency}/>
            </form>
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