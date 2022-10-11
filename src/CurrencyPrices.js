function CurrencyPrices(props) {
    return (
        <div>
            <h3>Name: {props.name}</h3>
            <h5>Bid: {props.bid}</h5>
            <h5>Ask: {props.ask}</h5>
        </div>
    )
}

export default CurrencyPrices;