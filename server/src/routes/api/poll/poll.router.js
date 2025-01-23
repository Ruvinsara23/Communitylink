const express = require('express');
const {
  createPoll,
  getPollsByCommunity,
  votePoll,
} = require('../../../controllers/poll/poll.controller');
const router = express.Router();

router.post('/create', createPoll);
router.get('/community/:communityId', getPollsByCommunity);
router.post('/vote', votePoll);

module.exports = router;