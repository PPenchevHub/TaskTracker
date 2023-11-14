const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.authenticate, taskController.getAllTasks);
router.post('/', authMiddleware.authenticate, taskController.createTask);
router.put('/:id', authMiddleware.authenticate, taskController.updateTask);
router.delete('/:id', authMiddleware.authenticate, taskController.deleteTask);
router.post('/:id/assign', authMiddleware.authenticate, taskController.assignTask);

module.exports = router;
