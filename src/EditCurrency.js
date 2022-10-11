import {useState} from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function EditCurrency(props) {

    const [name, setName] = useState(props.name)
    const [bid, setBid] = useState(props.bid)
    const [ask, setAsk] = useState(props.ask)

    // edit currency in db.json
    const editCurrency = (event) => {
        event.preventDefault();

        const name = event.target.form[0].value
        const bid = event.target.form[1].value
        const ask = event.target.form[2].value

        const data = { name, bid, ask}

        fetch(`http://localhost:8080/currencies/${event.target.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data)
        })
        console.log(event.target.id)
        socket.emit("refresh_rates");

    }

    return(
        <form>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            Bid:
            <input type="text" value={bid} onChange={(e) => setBid(e.target.value)} />
            Ask:
            <input type="text" value={ask} onChange={(e) => setAsk(e.target.value)} />
            <input type="submit" value="Update Currency" id={props.id} onClick={editCurrency}/>
        </form>

    )
}
export default EditCurrency;