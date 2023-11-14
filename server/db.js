const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params),
};
