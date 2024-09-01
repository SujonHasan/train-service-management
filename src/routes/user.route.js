const express = require('express');
const { register, login } = require('../controllers/user.controller');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const { isAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post("/register",registerValidation, register)
router.post("/login", loginValidation, login)

module.exports = router;