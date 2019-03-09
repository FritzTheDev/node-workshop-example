// require('express') adds the default export from the express package to our code as "express"
const express = require('express');
// to use express, you've got to instantiate it
const app = express();
//db here until I use something better.
const db = require('./dummy-db');

app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved',
    todos: db
  });
});

const PORT = 3000 //consts that are used as config variables can be ALLCAPS-ed