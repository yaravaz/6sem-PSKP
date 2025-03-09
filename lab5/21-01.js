const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const accs = require('./accounts.json') || [];
const session = require('express-session');

const getAcc = (accname) => {
        return accs.find((a) => a.username.toLowerCase() === accname.toLowerCase());
    }

const verifyPassword = (password1, password2) => {
    return password1 === password2;
}


const app = express();
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'longsecretcode'
}));
app.use(passport.initialize());

passport.use(new BasicStrategy((login, password, done) => {
    let credentials = getAcc(login);
    if (!credentials) {
         return done(null, false, { message: 'wrong login' });
    }
    else if (!verifyPassword(credentials.password, password)) {
        return done(null, false, { message: 'wrong password' });
    }
    else return done(null, login);
}));

app.get('/login', (req, res, next) => {
    if (req.session.logout) {
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, 
passport.authenticate('basic', { session: false }))
    .get('/login', (req, res) => {
        res.redirect('/resource');
    });

app.get('/logout', (req, res) => {
    req.session.logout = true;
    res.redirect('/login');
});

app.get('/resource', (req, res) => {
    if (req.headers['authorization'])
        res.send('information');
    else
        res.redirect('/login');
});

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => console.log('server running at http://localhost:3000'));
