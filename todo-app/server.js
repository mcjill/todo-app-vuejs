const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { text };
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete('/api/todos/:index', (req, res) => {
  const { index } = req.params;
  todos.splice(index, 1);
  res.sendStatus(204);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
