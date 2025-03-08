const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/Routes.js');
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs",
        helpers: {dismiss: () => "window.location.href = '/'"}
    }
))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => { console.log(`Сервер запущен на http://localhost:3000`);});