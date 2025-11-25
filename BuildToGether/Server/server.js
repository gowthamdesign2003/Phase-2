// server.js - BuildTogether (complete, ready-to-run)
const express = require('express');
const http = require('http');                // <-- make sure http is required
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const config = require('./config');         // config.js with MONGO_URI, JWT_SECRET, SERVER_PORT

// route modules (ensure these files exist)
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const taskRoutes = require('./routes/task');

const app = express();
const server = http.createServer(app);      // create server from app
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

// Basic rate limiter (adjust limits for production)
app.use(rateLimit({ windowMs: 1000 * 60, max: 200 }));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/task', taskRoutes);

// Socket.IO: board rooms & simple events
io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  socket.on('join-board', (boardId) => {
    if (boardId) socket.join(boardId);
  });

  socket.on('leave-board', (boardId) => {
    if (boardId) socket.leave(boardId);
  });

  // client-side may emit these to broadcast to other clients in the same room
  socket.on('task-updated', ({ boardId, payload }) => {
    if (boardId) socket.to(boardId).emit('task-updated', payload);
  });

  socket.on('comment-added', ({ boardId, payload }) => {
    if (boardId) socket.to(boardId).emit('comment-added', payload);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
  });
});

// expose io on app so controllers can emit server-side events
app.set('io', io);

// Connect to MongoDB and start the HTTP server
// Connect to MongoDB and start the HTTP server
mongoose.connect(config.MONGO_URI)
  .then(() => {
    const port = config.SERVER_PORT || 5000;
    server.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
