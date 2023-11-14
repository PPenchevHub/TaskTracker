const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ppenchev',
  password: 'postgres',
  port: 5432,
});

function getAllTasks(req, res) {
  const user_id = req.user.id;

  const query = {
    text: 'SELECT * FROM tasks WHERE assignee = $1',
    values: [user_id],
  };

  pool.query(query)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error getting tasks:', error);
      res.status(500).json({ message: 'Error getting tasks' });
    });
}

function createTask(req, res) {
  const { description, due_date } = req.body;
  const assignee = req.user.id;

  const query = {
    text: 'INSERT INTO tasks (description, due_date, assignee) VALUES ($1, $2, $3) RETURNING *',
    values: [description, due_date, assignee],
  };

  pool.query(query)
    .then((result) => {
      res.json(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Error creating task' });
    });
}

function updateTask(req, res) {
  const { id } = req.params;
  const { description, due_date, completed } = req.body;

  const query = {
    text: 'UPDATE tasks SET description = $1, due_date = $2, completed = $3 WHERE id = $4 RETURNING *',
    values: [description, due_date, completed, id],
  };

  pool.query(query)
    .then((result) => {
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json(result.rows[0]);
    })
    .catch((error) => {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Error updating task' });
    });
}

function assignTask(req, res) {
    const { id } = req.params;
    const assignee = req.user.id;
  
    const query = {
      text: 'UPDATE tasks SET assignee = $1 WHERE id = $2 AND assignee IS NULL RETURNING *',
      values: [assignee, id],
    };
  
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(400).json({ message: 'Task not available for assignment' });
        }
  
        res.json(result.rows[0]);
      })
      .catch((error) => {
        console.error('Error assigning task:', error);
        res.status(500).json({ message: 'Error assigning task' });
      });
  }
  
  function deleteTask(req, res) {
    const { id } = req.params;
  
    const query = {
      text: 'DELETE FROM tasks WHERE id = $1 RETURNING *',
      values: [id],
    };
  
    pool.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Task not found' });
        }
  
        res.json(result.rows[0]);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
      });
  }
  
  module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    assignTask,
    deleteTask,
  };
  