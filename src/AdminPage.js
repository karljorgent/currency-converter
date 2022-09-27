import CurrencyPrices from "./CurrencyPrices";
import {useEffect, useState} from "react";
import EditCurrencyPage from "./EditCurrencyPage";
import {useNavigate} from "react-router-dom";

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

    // add currency into db.json
    const addCurrency = (event) => {
        event.preventDefault();
        const name = event.target.form[0].value
        const bid = event.target.form[1].value
        const ask = event.target.form[2].value

        const data = { name, bid, ask}

        fetch('http://localhost:8080/currencies', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log('data sent', event)
        })
    }

    // edit currency in db.json
    const editCurrency = (event) => {
        event.preventDefault()



        console.log(event.target.id)
    }
    // delete currency from db.json
    const deleteCurrency = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/currencies/${event.target.id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }})

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
                    <input type="submit" value="Edit Currency" id={ cur.id } onClick={editCurrency}/>
                    <input type="submit" value="Delete Currency" id={ cur.id } onClick={deleteCurrency}/>
                </div>
            ))}
        </div>
    )
}

export default AdminPage;