const Board = require('../models/Board');
const Task = require('../models/Task');


exports.listPublic = async (req, res) => {
const boards = await Board.find({ isPublic: true, archived: false }).populate('owner', 'name email');
res.json(boards);
};


exports.getBoard = async (req, res) => {
const { id } = req.params;
const board = await Board.findById(id).populate('owner', 'name email');
if (!board) return res.status(404).json({ message: 'Board not found' });
const tasks = await Task.find({ board: id }).populate('assignees', 'name email');
res.json({ board, tasks });
};


exports.createBoard = async (req, res) => {
const { title, description, tags, isPublic } = req.body;
const owner = req.user._id;
const board = await Board.create({ title, description, tags, owner, isPublic });
res.json(board);
};


exports.deleteBoard = async (req, res) => {
const { id } = req.params;
const board = await Board.findById(id);
if (!board) return res.status(404).json({ message: 'Board not found' });
if (board.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
board.archived = true;
await board.save();
res.json({ message: 'Archived' });
};