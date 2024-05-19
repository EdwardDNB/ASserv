const express = require('express');
const router = express.Router();
const {addTask, getTasks, getTask, getMyTask, deleteTask, deleteTasks, updateTaskTitle, updateTaskStatus,
    updateTaskSupplies
} = require("../controllers/tasks-controller");
const {checkRole,checkAccessManOrStaff} = require("../middlewares/auth");
const {verifyToken} = require("../verifyToken");

// GET /tasks
// Получить все задачи
router.get('/tasks', getTasks);

// POST /tasks
// Создать новую задачу
router.post('/tasks', verifyToken,checkRole,checkAccessManOrStaff,addTask);

// GET /tasks/:id
// Получить задачу по ID
router.get('/tasks/:id', verifyToken, getTask, getMyTask);

// DELETE /tasks/:id
// Удалить задачу по ID
router.delete('/tasks/:id', verifyToken,checkRole,checkAccessManOrStaff,getTask, deleteTask);
router.delete('/tasksclear/:orderId', verifyToken,checkRole,checkAccessManOrStaff, deleteTasks);

router.put('/tasks/:id', verifyToken,checkRole,checkAccessManOrStaff, updateTaskTitle);
router.put('/tasksSupplies/:id', verifyToken,checkRole,checkAccessManOrStaff, updateTaskSupplies);
router.put('/tasks/changeTaskStatus/:id', verifyToken,checkRole,checkAccessManOrStaff, updateTaskStatus);

module.exports = router;
