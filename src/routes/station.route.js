const express = require('express');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { createStation, updateStation, getStations } = require('../controllers/station.controller');

const router = express.Router();


router.post("/", isAuthenticated, createStation);
router.put('/:id', isAuthenticated, updateStation);
router.get('/', getStations);

module.exports = router;