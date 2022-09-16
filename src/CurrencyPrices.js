function CurrencyPrices(props) {
    return (
        <div>
            <h3>{props.name}</h3>
            <h5>{props.bid}</h5>
            <h5>{props.ask}</h5>
        </div>
    )
}

export default CurrencyPrices;