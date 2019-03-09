// require('express') adds the default export from the express package to our code as "express"
const express = require('express');
// to use express, you've got to instantiate it
const app = express();
// db here until we get into MongoDB
const db = require('./dummy-db');
// "GET" route that gets all the todos in our dummy JS database
// first argument is a 'route' string, second is a callback with Request & Response
app.get('/api/todos', (req, res) => {
  // optional: works as a logger that announces when routes are hit and at what time.
  console.log('GET ' + req.route.path + ' ' + new Date().toISOString());
  // response status
  res.status(200).send({
    success: 'true', // alerts the client app that the request suceeded
    message: 'todos retrieved', // same
    todos: db // the actual "database" object that gets passed with the request as part of the JSON.
  });
});
// post route to add data
app.post('/api/todos', (req, res) => {
  // interrupts the function to respond with status 400 if no title
  if (!req.body.title) {
    // 4xx is the "Problem with a request" error code
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    }); // same as above, but with description
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: db.length + 1, // adds the db at the next available index
    title: req.body.title, // adds title from request body
    description: req.body.description // adds description from request description
  }
  db.push(todo);
  // created new resource status code
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo: todo // could also be written as a single "todo" without the assignment.
  });
});

// constants that are used as config variables can be ALLCAPS-ed
const PORT = 3000;
// makes the server start listening for requests.
app.listen(PORT, () => { // optional callback
  console.log(`We Have Liftoff on port ${PORT}🚀`); // alerts the person who started the server that it's ready.
});