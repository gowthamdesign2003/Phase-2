const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
title: { type: String, required: true },
description: { type: String },
status: { type: String, enum: ['To Do','In Progress','Done'], default: 'To Do' },
assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Task', TaskSchema);