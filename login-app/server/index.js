const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'login_app_db',
  password: '123456', // Add your password if you have one
  port: 5432,
});

// 1. REGISTER ROUTE (New)
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Hash the password so it's not stored in plain text
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed. Username or Email might already exist." });
  }
});

// 2. LOGIN ROUTE (Updated for Security)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare the plain password with the hashed password in DB
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        res.json({ success: true, user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});