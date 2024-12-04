const express = require('express');
const router = express.Router();
const {createCommunity}= require('../../../controllers/community/community.controller');



router.post('/create-community',createCommunity);


module.exports=router;
