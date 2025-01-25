const express = require('express');
const {getAllPosts,createPost,likePost,deletePost} = require('../../../controllers/post/post.controller');
const router = express.Router();

router.get('/community:communityId',getAllPosts);
router.post('/',createPost);
router.post('/:id/like',likePost);
router.delete('/:id',deletePost);

module.exports = router;
