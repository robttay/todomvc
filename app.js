//
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const Todo = require("./static/js/models/Todo");
const dbURL = "mongodb://localhost:27017/todo-mvc";
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("Connected to todo-mvc DB.");
});

app.use(bodyParser.json());
app.use("/static", express.static("static"));

app.get("/api/todos/", (req, res) => {
  Todo.find()
    .then(foundTodos => {
      res.send(foundTodos);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/todos/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(foundTodo => {
      res.send(foundTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
app.patch("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTodo => {
      res.send(updatedTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updatedTodo => {
      res.send(updatedTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/api/todos/", (req, res) => {
  let todoData = req.body;
  console.log(req.body);
  let newTodo = new Todo(todoData);
  newTodo
    .save()
    .then(savedTodo => {
      console.log("foundTodo: ", savedTodo);
      res.send(savedTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Deleted record");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});
