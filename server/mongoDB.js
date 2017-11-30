"use strict";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('./logger');

const dbDisabled = process.env.DB_DISABLED || false;
const url = process.env.DB_URL || 'mongodb://localhost:27018/coffequiz';
let db;

logger.info(dbDisabled ? "DB disabled" : "DB url: " + url);

function connect() {
  if (dbDisabled) {
    return Promise.resolve();
  }
  return MongoClient.connect(url)
    .then(database => {
      db = database;
    });
}

function saveQuizResponse(quizResponse) {
  if (dbDisabled) {
    return;
  }
  db.collection('quizResponse').insertOne(quizResponse, (err, r) => {
    assert.notEqual(db, undefined);
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    logger.debug("Document inserted successfully", quizResponse);
  });
}

const mongoAPI = {
  connect: connect,
  saveQuizResponse: saveQuizResponse
};

module.exports = mongoAPI;

