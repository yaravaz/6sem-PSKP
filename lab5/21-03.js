const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const accs = require('./accounts.json');

const getAcc = (accname) => {
    return accs.find((a) => a.username.toLowerCase() === accname.toLowerCase());
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'longsecretcode'
}));

const formAuthMiddleware = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    const { username, password } = req.body;
    const account = getAcc(username);

    if (account && account.password === password) {
        req.session.user = username;
        return res.redirect('/resource');
    } else {
        return res.status(401).send('wrong login or password');
    }
};

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', formAuthMiddleware);

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/resource');
        }
        res.redirect('/login');
    });
});

app.get('/resource', (req, res) => {
    if (req.session.user) {
        res.send(`information: ${req.session.user}`);
    } else {
        res.redirect('/login');
    }
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('server running at http://localhost:3000'));