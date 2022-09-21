function CreateCurrencies(name, bid, ask) {
    fetch("http://localhost:8080/currencies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)
    }).then(
        this.setState({
            currencies: {
                name: name,
                bid: bid,
                ask: ask
            }
        })
    );
}

export default CreateCurrencies;