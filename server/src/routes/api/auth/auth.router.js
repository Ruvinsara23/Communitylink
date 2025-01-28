const express = require('express');
const router = express.Router();
const { registerUser, verifyToken,loginUser,registergoogleuser,getUserByFirebaseUID } = require('../../../controllers/auth/auth.controller');


router.post('/register-google',registergoogleuser)
router.post('/register', registerUser);
router.post('/verify-token', verifyToken);
router.post('/login',loginUser);
router.get('/user/:firebaseUID',getUserByFirebaseUID);

module.exports = router;


// both memeber and community sceama has members and join community fields