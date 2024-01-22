const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'github_repos',
  password: '123456',
  port: 5432,
});

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/repos/:username', async (req, res) => {
  const { username } = req.params;
  const { rows } = await pool.query('SELECT * FROM repositories WHERE username = $1', [username]);
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});