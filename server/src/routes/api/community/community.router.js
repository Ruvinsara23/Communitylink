const express = require('express');
const router = express.Router();
const multer = require("multer");
const {createCommunity,getComunitiesByUser,getCommunityBySlug,updateCommiunity,addMember,uploadCommunityImages}= require('../../../controllers/community/community.controller');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.post('/create-community',createCommunity);
router.get('/user/:userId',getComunitiesByUser);
router.get('/:slug',getCommunityBySlug);
router.put('/update',updateCommiunity);
router.put('/add-member',addMember)
router.put(
    "/:communityId/upload-images",
    upload.fields([
      { name: "communityImage", maxCount: 1 },
      { name: "bannerImage", maxCount: 1 },
    ]),
    uploadCommunityImages
  );



module.exports=router;
