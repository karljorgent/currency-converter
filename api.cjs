//Add express to the file
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database.cjs");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
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

app.listen(process.env.API_PORT, () =>
	console.log("Listening on port " + process.env.API_PORT)
);
