const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { createTrain, updateTrain, getTrains, getTrainById } = require('../controllers/train.controller');

const router = express.Router();

router.post('/', isAuthenticated, createTrain);
router.put('/:id', isAuthenticated, updateTrain);
router.get('/', getTrains);
router.get('/:id', getTrainById);

module.exports = router;