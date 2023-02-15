import React from "react";
import Popup from "reactjs-popup";
import EditCurrency from "./EditCurrency";

export default function Currency(props) {
	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this currency?")) {
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			};
			fetch(`http://localhost:8080/currencies/${props.id}`, options).then(
				(res) => {
					if (res.status === 204) {
						console.log("Currency deleted successfully");
					} else {
						console.log("Error deleting currency");
					}
				}
			);
		}
	};

	return (
		<div>
			<h2>{props.name}</h2>
			<p>Bid: {props.bid}</p>
			<p>Ask: {props.ask}</p>
			{props.isAdmin ? (
				<div>
					<button type="submit" onClick={() => handleDelete()}>
						Delete
					</button>
					<Popup
						trigger={<button>Edit</button>}
						position="bottom left"
					>
						<EditCurrency
							key={props.id}
							id={props.id}
							name={props.name}
							bid={props.bid}
							ask={props.ask}
						/>
					</Popup>
				</div>
			) : null}
		</div>
	);
}
