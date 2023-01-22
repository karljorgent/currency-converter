const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database.cjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function generateAccessToken(id) {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, (err, token) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.token = token;
		next();
	});
}

app.use(express.json());

app.use(
	cors({
		origin: "*",
		methods: "*",
	})
);

app.get("/currencies", (req, res) => {
	var sql = "select * from currencies";
	var params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

// Users

app.post("/users/create", (req, res) => {
	var sql = "insert into users (username, password) values (?,?)";
	var params = [req.body.username, req.body.password];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: `User '${req.body.username}' created`,
		});
	});
});

app.post("/users/login", (req, res) => {
	var sql = "select id from users where username = ? and password = ?";
	var params = [req.body.username, req.body.password];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		} else if (rows.length == 0) {
			res.status(400).json({ error: "User not found" });
			return;
		} else {
			res.json({
				message: "success",
				token: generateAccessToken(rows[0].id),
				admin: rows[0].id == 1,
			});
		}
	});
});

app.get("/users/read/all", (req, res) => {
	var sql = "select * from users";
	var params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

app.get("/", authenticateToken, (req, res) => {
	res.json({
		message: "success",
		token: req.token,
	});
});

app.listen(process.env.API_PORT, () =>
	console.log(`http://localhost:${process.env.API_PORT}`)
);
