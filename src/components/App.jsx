import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import CreateCurrency from "./CreateCurrency";
import "./css/App.css";
import Currency from "./Currency.jsx";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function App() {
	const [currencies, setCurrencies] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		fetchCurrency();
		if (localStorage.getItem("token")) {
			setIsAdmin(true);
		}
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

	const renderUser = () => {
		return (
			<div>
				<Popup trigger={<button>Log In</button>} position="bottom left">
					<LogIn />
				</Popup>
				<Popup
					trigger={<button>Sign Up</button>}
					position="bottom left"
				>
					<SignUp />
				</Popup>
			</div>
		);
	};

	const renderAdmin = () => {
		return (
			<div>
				<Popup
					trigger={<button>Add New Currency</button>}
					position="bottom left"
				>
					<CreateCurrency />
				</Popup>
			</div>
		);
	};

	return (
		<div className="App">
			<nav>
				<h1 className="logo">Currency Converter</h1>
				{isAdmin ? renderAdmin() : renderUser()}
				<br />
			</nav>
			<br />
			<div className="Currencies">
				<h1>Live Currency Rates</h1>
				<br />
				{currencies.map((currency) => (
					<Currency
						key={currency.id}
						id={currency.id}
						name={currency.name}
						bid={currency.bid}
						ask={currency.ask}
						isAdmin={isAdmin}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
