"use strict";

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const logger = require('./logger');

// Connection URL
const url = 'mongodb://localhost:27018/coffequiz';
let db;

function connect() {
  return MongoClient.connect(url)
    .then(database => {
      db = database;
    });
}

function saveQuizResponse(quizResponse) {
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

