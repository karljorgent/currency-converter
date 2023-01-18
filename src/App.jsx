import { useEffect, useState } from "react";
import "./App.css";
import "./components/Currency.jsx";
import Currency from "./components/Currency.jsx";

function App() {
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		fetchCurrency();
	}, []);

	const fetchCurrency = async () => {
		let url = "http://localhost:8080/";

		let options = { method: "GET" };

		await fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				setCurrencies(json.data);
			})
			.catch((err) => console.error("error:" + err));
	};

	return (
		<div className="App">
			<h1>Live Currency Rates</h1>
			<br />
			{currencies.map((currency) => (
				<Currency
					key={currency.id}
					name={currency.name}
					bid={currency.bid}
					ask={currency.ask}
				/>
			))}
		</div>
	);
}

export default App;
