const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ppenchev',
  password: 'postgres',
  port: 5432,
});

const JWT_SECRET = 'test';

async function register(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = {
    text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    values: [name, email, hashedPassword],
  };

  pool.query(query)
    .then((result) => {
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ user, token });
    })
    .catch((error) => {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    });
}

async function login(req, res) {
  const { email, password } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  pool.query(query)
    .then(async (result) => {
      const user = result.rows[0];
      console.log("User id: " + user.id + " logged in!")

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      res.json({ user, token });
    })
    .catch((error) => {
      console.error('Error getting user:', error);
      res.status(500).json({ message: 'Error getting user' });
    });
}

module.exports = {
  register,
  login,
};
