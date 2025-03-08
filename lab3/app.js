const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = require('./routes/promotionRoute.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', promotionRouter);

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
})