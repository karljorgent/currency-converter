var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log("Connected to the SQLite database.");
		db.run(
			`CREATE TABLE currencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE, 
            bid INTEGER, 
            ask INTEGER, 
            CONSTRAINT name UNIQUE (name)
            )`,
			(err) => {
				if (err) {
					// Table already created
				} else {
					// Table just created, creating some rows
					var insert =
						"INSERT INTO currencies (name, bid, ask) VALUES (?,?,?)";
					db.run(insert, ["EURUSD", 1.1854, 1.1954]);
					db.run(insert, ["USDJPY", 109.59, 109.69]);
					db.run(insert, ["CADGBP", 0.7211, 0.7311]);
				}
			}
		);
	}
});

module.exports = db;
