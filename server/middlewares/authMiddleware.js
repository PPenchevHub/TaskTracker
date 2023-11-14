const jwt = require('jsonwebtoken');
const { pool } = require('../db/config');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, 'testing');

    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    const user = rows[0];
    console.log(rows.length)


    if (!user) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

module.exports = {
  authenticate,
};
