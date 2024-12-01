const express = require('express');
const router = express.Router();
const { registerUser, verifyToken,loginUser } = require('../../../controllers/auth/auth.controller');


router.post('/register', registerUser);
router.post('/verify-token', verifyToken);
router.post('/login',loginUser);

module.exports = router;