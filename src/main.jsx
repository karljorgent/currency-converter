import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Admin from "./components/Admin";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
