import CurrencyPrices from './CurrencyPrices';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import './popup.css';
import EditCurrency from './EditCurrency';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function AdminPage() {
    const dataFromLocal = JSON.parse(localStorage.getItem('rates'));
    const [jsonStatus, setJsonStatus] = useState(false);
    // getting currency rates from db.json
    const [rates, setRates] = useState([]);

    const fetchCurrencies = () => {
        fetch('http://localhost:8080/currencies')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setRates(response);
                setJsonStatus(true);
            });
    };

    useEffect(() => {
        setRates(dataFromLocal);
        fetchCurrencies();
        socket.on('recive_rates', () => {
            console.log('recive');
            fetchCurrencies();
        });
        console.log('useEffect');
    }, [socket]);

    // add currency into db.json
    const addCurrency = (event) => {
        event.preventDefault();
        const name = event.target.form[0].value;
        const bid = event.target.form[1].value;
        const ask = event.target.form[2].value;

        const data = { name, bid, ask };

        fetch('http://localhost:8080/currencies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(() => {
            socket.emit('refresh_rates');
        });
    };

    // delete currency from db.json
    const deleteCurrency = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/currencies/${event.target.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            socket.emit('refresh_rates');
        });
    };

    return (
        <div className="AdminStuff">
            <form>
                Name:
                <input type="text" placeholder="name" />
                Bid:
                <input type="text" placeholder="bid" />
                Ask:
                <input type="text" placeholder="ask" />
                <input
                    type="button"
                    value="Add Currency"
                    onClick={addCurrency}
                />
            </form>
            <h1>Currency rates</h1>
            {!jsonStatus && <h6>Data may be inaccurate</h6>}
            {rates.map((cur) => (
                <div className="currencyBox" key={cur.id}>
                    <CurrencyPrices
                        name={cur.name}
                        bid={cur.bid}
                        ask={cur.ask}
                    />
                    <Popup
                        trigger={<button> Edit Currency </button>}
                        position="right"
                    >
                        <div>
                            <h2>New Values</h2>
                            <EditCurrency
                                name={cur.name}
                                bid={cur.bid}
                                ask={cur.ask}
                                id={cur.id}
                            />
                        </div>
                    </Popup>
                    <input
                        type="button"
                        value="Delete Currency"
                        id={cur.id}
                        onClick={deleteCurrency}
                    />
                </div>
            ))}
        </div>
    );
}

export default AdminPage;
