"use strict";

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('www'));

app.listen(port, (err) => {
    if (err) {
        return console.error('An error occurred', err);
    }
    console.log(`server is listening on ${port}`);
});
