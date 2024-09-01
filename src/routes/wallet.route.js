const express = require('express');
const { addFunds, getWallet } = require('../controllers/wallet.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/add-funds', isAuthenticated, addFunds);
router.get('/', isAuthenticated, getWallet);

module.exports = router;