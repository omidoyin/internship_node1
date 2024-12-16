const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simple in-memory data store
const db = {
  posts: [
    { id: 1, title: "Hello world!", content: "Welcome to the first post.", userId: 1 },
    { id: 2, title: "Second post", content: "This is another post.", userId: 2 },
  ],
  users: [
    { id: 1, username: "mevdschee", phone: null },
    { id: 2, username: "johndoe", phone: "1234567890" },
  ],
  comments: [
    { id: 1, postId: 1, userId: 1, message: "Hi!" },
    { id: 2, postId: 1, userId: 2, message: "Great post!" },
  ]
};

// Helper function to filter object properties
function filterProperties(obj, properties) {
  return properties.reduce((filtered, prop) => {
    if (obj.hasOwnProperty(prop)) {
      filtered[prop] = obj[prop];
    }
    return filtered;
  }, {});
}

// GET /records/{table}
app.get('/records/:table', (req, res) => {
  const table = req.params.table;
  const include = req.query.include ? req.query.include.split(',') : null;

  if (!db[table]) {
    return res.status(404).json({ error: 'Table not found' });
  }

  let result = db[table];
  if (include) {
    result = result.map(item => filterProperties(item, include));
  }

  res.json(result);
});

// GET /records/{table}/{id}
app.get('/records/:table/:id', (req, res) => {
  const { table, id } = req.params;
  const include = req.query.include ? req.query.include.split(',') : null;
  const join = req.query.join ? req.query.join.split(',') : null;

  if (!db[table]) {
    return res.status(404).json({ error: 'Table not found' });
  }

  let item = db[table].find(i => i.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (include) {
    item = filterProperties(item, include);
  }

  if (join) {
    join.forEach(joinTable => {
      if (db[joinTable]) {
        const foreignKey = `${table.slice(0, -1)}Id`;
        item[joinTable] = db[joinTable].filter(i => i[foreignKey] === item.id);
      }
    });
  }

  res.json(item);
});

// POST /records/{table}
app.post('/records/:table', (req, res) => {
  const table = req.params.table;

  if (!db[table]) {
    return res.status(404).json({ error: 'Table not found' });
  }

  const newItem = { id: db[table].length + 1, ...req.body };
  db[table].push(newItem);
  res.status(201).json(newItem);
});

// PUT /records/{table}/{id}
app.put('/records/:table/:id', (req, res) => {
  const { table, id } = req.params;

  if (!db[table]) {
    return res.status(404).json({ error: 'Table not found' });
  }

  const index = db[table].findIndex(i => i.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  db[table][index] = { ...db[table][index], ...req.body };
  res.json(db[table][index]);
});

// DELETE /records/{table}/{id}
app.delete('/records/:table/:id', (req, res) => {
  const { table, id } = req.params;

  if (!db[table]) {
    return res.status(404).json({ error: 'Table not found' });
  }

  const index = db[table].findIndex(i => i.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  db[table].splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`TreeQL server running at http://localhost:${port}`);
});