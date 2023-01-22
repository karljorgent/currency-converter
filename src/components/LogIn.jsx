import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LogIn.css";

export default function LogIn() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		let url = "http://localhost:8080/users/login";

		let options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: `{"username":"${username}","password":"${password}"}`,
		};

		await fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem("token", data.token);
				if (data.admin === true) {
					navigate("/admin");
				} else {
					navigate("/");
				}
			});
	};
	return (
		<div className="log-in">
			<h1>Log In</h1>
			<form className="log-up">
				<label>
					Username:
					<input
						type="text"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					Password:
					<input
						type="password"
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</label>
				<input
					type="submit"
					value="Submit"
					onClick={(e) => handleSubmit(e)}
				/>
				<input
					type="submit"
					value="Back"
					onClick={() => navigate("/")}
				/>
			</form>
		</div>
	);
}
