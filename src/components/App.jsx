import { useEffect, useState } from "react";
import "./css/App.css";
import Currency from "./Currency.jsx";

function App() {
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		fetchCurrency();
	}, []);

	const fetchCurrency = async () => {
		let url = "http://localhost:8080/currencies";

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
			<nav>
				<h1 className="logo">Currency Converter</h1>
				<a className="nav-btn" href="/">
					Home
				</a>
				<a className="nav-btn" href="/login">
					Log In
				</a>
				<a className="nav-btn" href="/signup">
					Sign Up
				</a>
			</nav>
			<br />
			<div className="Currencies">
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
		</div>
	);
}

export default App;
