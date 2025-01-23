const Poll = require('../../models/poll/poll.model');
const Community = require('../../models/community/community.model');

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { title, options, communityId } = req.body;

    // Validate community existence
    const communityExists = await Community.findById(communityId);
    if (!communityExists) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Create poll with options and community reference
    const poll = new Poll({
      title,
      options: options.map(option => ({ text: option.text })), // Initialize options
      communityId,
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all polls
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('communityId', 'name description'); // Include community details
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get polls by community ID
exports.getPollsByCommunity = async (req, res) => {
  try {
    const { communityId } = req.params;

    // Fetch polls associated with the given community
    const polls = await Poll.find({ communityId }).populate('communityId', 'name description');
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Vote on a poll
exports.votePoll = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;

    // Find the poll by ID
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });

    // Validate option index
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index' });
    }

    // Increment votes for the chosen option and total votes
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;

    await poll.save();

    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
