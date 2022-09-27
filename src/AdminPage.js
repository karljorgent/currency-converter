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

    const addCurrency = (event) => {
        event.preventDefault();
        const name = event.target.form[0].value
        const bid = event.target.form[1].value
        const ask = event.target.form[2].value

        const data = { name, bid, ask}

        // event.target.form[0].value, event.target.form[1].value, event.target.form[2].value
        fetch('http://localhost:8080/currencies', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log('data sent')
        })
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
                <div className="currencyBox" key={ cur.id }>
                    <CurrencyPrices
                        name={cur.name}
                        bid={cur.bid}
                        ask={cur.ask}
                    />
                </div>
            ))}
        </div>
    )
}

export default AdminPage;