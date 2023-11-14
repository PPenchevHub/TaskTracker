const express = require('express');
const cors = require('cors');


const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


// User routes
app.post('/register', userController.register);
app.post('/login', userController.login);

// Task routes
app.get('/tasks', authMiddleware.authenticate, taskController.getAllTasks);
app.post('/tasks', authMiddleware.authenticate, taskController.createTask);
app.put('/tasks/:id', authMiddleware.authenticate, taskController.updateTask);
app.delete('/tasks/:id', authMiddleware.authenticate, taskController.deleteTask);
app.post('/tasks/:id/assign', authMiddleware.authenticate, taskController.assignTask);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
