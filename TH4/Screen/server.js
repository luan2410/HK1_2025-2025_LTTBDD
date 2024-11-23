const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'accountmobile'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM account WHERE user = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
