const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Board = require('../models/Board');

/**
 * Add a task to a board
 * POST /api/task/add
 * body: { boardId, title, description }
 */
exports.addTask = async (req, res) => {
  try {
    const { boardId, title, description } = req.body;
    if (!boardId || !title) return res.status(400).json({ message: 'Missing boardId or title' });

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const task = await Task.create({
      board: boardId,
      title: title.trim(),
      description: description ? description.trim() : '',
      createdBy: req.user._id
    });

    const populated = await Task.findById(task._id)
      .populate('createdBy', 'name email')
      .populate('assignees', 'name email');

    // Emit to socket.io room for real-time update
    const io = req.app.get('io');
    if (io) io.to(boardId).emit('task-updated', { action: 'add', task: populated });

    return res.json(populated);
  } catch (err) {
    console.error('addTask error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update task status (move between columns)
 * POST /api/task/update-status
 * body: { taskId, status }
 */
exports.updateStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    if (!taskId || !status) return res.status(400).json({ message: 'Missing taskId or status' });

    const allowed = ['To Do', 'In Progress', 'Done'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    const populated = await Task.findById(task._id)
      .populate('createdBy', 'name email')
      .populate('assignees', 'name email');

    const io = req.app.get('io');
    if (io) io.to(task.board.toString()).emit('task-updated', { action: 'update', task: populated });

    return res.json(populated);
  } catch (err) {
    console.error('updateStatus error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Add a comment to a task
 * POST /api/task/comment
 * body: { taskId, text }
 */
exports.addComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;
    if (!taskId || !text) return res.status(400).json({ message: 'Missing taskId or text' });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const comment = await Comment.create({
      task: taskId,
      user: req.user._id,
      text: text.trim()
    });

    const populated = await Comment.findById(comment._id).populate('user', 'name email');

    const io = req.app.get('io');
    if (io) io.to(task.board.toString()).emit('comment-added', populated);

    return res.json(populated);
  } catch (err) {
    console.error('addComment error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
