"use strict";

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./logger");
const mongo = require("./mongoDB");

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../www')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/response', (req, res) => {
  const quizResponse = req.body;
  quizResponse.timestamp = new Date();
  logger.info("quiz response: ", quizResponse);
  mongo.saveQuizResponse(quizResponse);
  res.send({});
});

mongo.connect()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        return logger.error('An error occurred', err);
      }
      logger.info(`server is listening on ${port}`);
    });
  })
  .catch(error => logger.error(error));
