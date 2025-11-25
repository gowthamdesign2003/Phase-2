const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const boardController = require('../controllers/boardController');


// Public
router.get('/public', boardController.listPublic);
router.get('/:id', boardController.getBoard);


// Protected
router.post('/create', auth, boardController.createBoard);
router.delete('/:id', auth, boardController.deleteBoard);


module.exports = router;