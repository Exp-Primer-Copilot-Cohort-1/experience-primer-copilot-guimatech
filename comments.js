// Create web server
// Run: node comments.js
// Test: curl -i http://localhost:3000/comments
// Test: curl -i http://localhost:3000/comments/1
// Test: curl -i http://localhost:3000/comments/2
// Test: curl -i -X POST -H "Content-Type:application/json" -d '{"body":"comment body"}' http://localhost:3000/comments
// Test: curl -i -X PUT -H "Content-Type:application/json" -d '{"body":"comment body"}' http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/2

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var comments = [
  { id: 1, body: 'comment 1' },
  { id: 2, body: 'comment 2' }
];

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.get('/comments/:id', function(req, res) {
  var comment = comments.find(function(comment) {
    return comment.id === parseInt(req.params.id);
  });
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.post('/comments', function(req, res) {
  var newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.put('/comments/:id', function(req, res) {
  var updatedComment = req.body;
  var comment = comments.find(function(comment) {
    return comment.id === parseInt(req.params.id);
  });
  if (comment) {
    comment.body = updatedComment.body;
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.delete('/comments/:id', function(req, res) {
  var index = comments.findIndex(function(comment) {
    return comment.id === parseInt(req.params.id);
  });
  if (index >= 0) {
    comments.splice(index, 1);
  }
});