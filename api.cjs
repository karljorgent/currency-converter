const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database.cjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(
	cors({
		origin: "*",
		methods: "*",
	})
);

// Currencies

// get all currencies
app.get("/currencies", (req, res) => {
	var sql = "select * from currencies";
	var params = [];
	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err });
			return;
		}
		res.json({
			message: "success",
			data: rows,
		});
	});
});

// create a new currency
app.post("/currencies", authenticateToken, (req, res) => {
	// check that data is given
	if (!req.body.name || !req.body.bid || !req.body.ask) {
		res.status(400).json({ error: "Missing data" });
		return;
	}
	const sql = "insert into currencies (name, bid, ask) values (?,?,?)";
	const params = [req.body.name, req.body.bid, req.body.ask];
	db.all(sql, params, (err) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.status(201).json({
			message: `Currency '${req.body.name}' created`,
		});
	});
});

// delete a currency
app.delete("/currencies/:id", authenticateToken, (req, res) => {
	const sql = "delete from currencies where id = ?";
	const params = [req.params.id];
	db.all(sql, params, (err) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.status(204).json({ message: "Currency deleted" });
	});
});

// Users

// create a new user
app.post("/users/create", (req, res) => {
	var sql = "insert into users (username, password) values (?,?)";
	var params = [req.body.username, req.body.password];
	db.all(sql, params, (err) => {
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
		} else if (rows.length === 0) {
			res.status(400).json({ error: "User not found" });
		} else {
			res.json({
				message: "success",
				token: generateAccessToken(rows[0].id),
				admin: rows[0].id === 1,
			});
		}
	});
});

app.listen(process.env.API_PORT, () =>
	console.log(`http://localhost:${process.env.API_PORT}`)
);
