import React, {useState} from 'react'
import './css/EditCurrency.css'

export default function EditCurrency(props) {
	const [name, setName] = useState(props.name);
	const [bid, setBid] = useState(props.bid);
	const [ask, setAsk] = useState(props.ask);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name == null || bid == null || ask == null) {
			alert("Please fill out all fields");
		} else {
			let url = `http://localhost:8080/currencies/${props.id}`;
			let options = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({
					name: name,
					bid: bid,
					ask: ask,
				}),
			};
			let status;
			fetch(url, options)
				.then((res) => {
					status = res.status;
					return res.json();
				})
				.then((json) => {
					if (status === 200) {
						alert("Currency updated successfully");
					} else {
						if (json.error) alert("Error " + status + " updating currency: " + json.error);
						else alert("Error updating currency: " + JSON.stringify(json));
					}
					return json;
				})
				.catch((err) => console.error("error:" + err));
		}
	}


	return (
		<div className="edit-currency">
			<h1>Edit Currency</h1>
			<form>
				<div className="name">
					Name:
					<input
						type="text"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</div>
				<div className="bid">
					Bid:
					<input
						type="text"
						value={bid}
						onChange={(event) => {
							setBid(event.target.value);
						}}
					/>
				</div>
				<div className="ask">
					Ask:
					<input
						type="text"
						value={ask}
						onChange={(event) => {
							setAsk(event.target.value);
						}}
					/>
				</div>

				<input
					type="submit"
					value="Save"
					onClick={(e) => handleSubmit(e)}
				/>
				<input
					type="submit"
					value="Cancel"
				/>
			</form>
		</div>
	)
}
