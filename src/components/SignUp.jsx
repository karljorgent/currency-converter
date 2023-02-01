import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/SignUp.css";

export default function SignUp() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		let url = "http://localhost:8080/users/create";

		let options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: `{"username":"${username}","password":"${password}"}`,
		};
		console.log(options.body);

		fetch(url, options).then((response) => {
			if (response.status === 200) {
				alert("User created");
				navigate("/");
			} else {
				alert("User not created");
			}
		});
	};

	return (
		<div className="sign-up">
			<h1>Sign Up</h1>
			<form>
				<label>
					<div className="username">
						Username:
						<input
							type="text"
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
					</div>
					<div className="password">
						Password:
						<input
							type="password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</div>
				</label>
				<input
					type="submit"
					value="Submit"
					onClick={(e) => handleSubmit(e)}
				/>
				<input
					type="submit"
					value="Cancel"
				/>
			</form>
		</div>
	);
}
