//Add express to the file
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.listen(process.env.API_PORT, () => console.log('Listening on port ' + process.env.API_PORT));

