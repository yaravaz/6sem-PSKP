const express = require('express');
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
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

passport.use(new DigestStrategy({qop: 'auth'}, (acc, done) => {
    let account = getAcc(acc);
    if (!account) {
        return done(null, false);
    } else return done(null, account.username, account.password);
}, (params, done) => {
    console.log('params: ', params);
    done(null, true);
}));

app.get('/login', (req, res, next) => {
    if (req.session.logout) {
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, 
passport.authenticate('digest', { session: false }))
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
