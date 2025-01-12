const express = require('express');
const router = express.Router();
const { createChat,fetchChatsByCommunityId,fetchChatsByUserId  } = require('../../../controllers/chat/chat.controller');

router.post('/create-chat', createChat);
router.get('/:communityId', fetchChatsByCommunityId);

module.exports = router;