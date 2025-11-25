const mongoose = require('mongoose');


const BoardSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String },
tags: [String],
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
isPublic: { type: Boolean, default: true },
archived: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Board', BoardSchema);