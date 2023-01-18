import React from "react";

export default function Currency(props) {
	return (
		<div>
			<h2>{props.name}</h2>
			<p>Bid: {props.bid}</p>
			<p>Ask: {props.ask}</p>
		</div>
	);
}
