const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');


router.post('/add', auth, taskController.addTask);
router.post('/update-status', auth, taskController.updateStatus);
router.post('/comment', auth, taskController.addComment);


module.exports = router;