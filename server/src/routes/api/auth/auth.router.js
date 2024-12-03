const express = require('express');
const router = express.Router();
const { registerUser, verifyToken,loginUser,registergoogleuser } = require('../../../controllers/auth/auth.controller');


router.post('/register-google',registergoogleuser)
router.post('/register', registerUser);
router.post('/verify-token', verifyToken);
router.post('/login',loginUser);

module.exports = router;