import React from "react";

export default function Currency(props) {
	const handleDelete = () => {
		if (confirm("Are you sure you want to delete this currency?") == true) {
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
				<button type="submit" onClick={() => handleDelete()}>
					Delete
				</button>
			) : null}
		</div>
	);
}
