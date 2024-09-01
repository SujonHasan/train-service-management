const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const purchaseTicket = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/purchase', isAuthenticated, purchaseTicket);

module.exports = router;