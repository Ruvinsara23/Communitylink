const express = require('express');
const router = express.Router();
const {createCommunity,getComunitiesByUser,getCommunityBySlug,updateCommiunity,addMember}= require('../../../controllers/community/community.controller');


 
router.post('/create-community',createCommunity);
router.get('/user/:userId',getComunitiesByUser);
router.get('/:slug',getCommunityBySlug);
router.put('/update',updateCommiunity);
router.put('/add-member',addMember)



module.exports=router;
