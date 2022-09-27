import CurrencyPrices from "./CurrencyPrices";
import {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditCurrency from "./EditCurrency";

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
            console.log('data sent')
        })
    }


    // delete currency from db.json
    const deleteCurrency = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/currencies/${event.target.id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            console.log('data deleted')
        })

    }

    return (
        <div className="AdminStuff">
            <form>
                Name:
                <input type="text" placeholder="name" />
                Bid:
                <input type="text" placeholder="bid" />
                Ask:
                <input type="text" placeholder="ask" />
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
                    <Popup trigger={<button> Edit Currency </button>} position="right">
                        <div>
                            <CurrencyPrices
                                name={cur.name}
                                bid={cur.bid}
                                ask={cur.ask}
                            />
                            <h2>New Prices</h2>
                            <EditCurrency
                                name={cur.name}
                                bid={cur.bid}
                                ask={cur.ask}
                                id={cur.id}
                            />

                        </div>
                    </Popup>
                    <input type="submit" value="Delete Currency" id={ cur.id } onClick={deleteCurrency}/>
                </div>
            ))}
        </div>
    )
}

export default AdminPage;