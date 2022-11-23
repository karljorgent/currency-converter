var express = require('express');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var cors = require('cors');
var app = express();
var port = 7777;
const oneDay = 1000 * 60 * 60 * 24;
var session;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//session middleware
app.use(
    sessions({
        secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);

const getAdmin = (username, password) => {
    for (let i = 0; i < data.users.length; i++) {
        if ((data.users[i].username = username) && (data.users[i].password = password)) {
            return data.users[i].admin;
        }
    }
};

app.get('/', (req, res) => {
    req.session.admin = getAdmin(req.body.username, req.body.password);
    res.send(req.session.id);
});

app.post('/post-data', (req, res) => {
    let obj = [];
    obj.push(req.body.username);
    res.send(obj);
});

app.post('/is-admin', (req, res) => {
    req.session.admin = getAdmin(req.body.username, req.body.password);
    res.send(req.session.admin);
});

app.get('/currencies', function (req, res) {
    res.send(data.currencies);
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on http://localhost:${port}`);
});
