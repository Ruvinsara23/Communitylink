const Post = require('../../models/post/post.model');

exports.getAllPosts = async (req, res) => {
    exports.getAllPosts = async (req, res) => {
        const { communityId } = req.params; // Extract communityId from URL parameters
    
        try {
            const posts = await Post.find({ communityId })
                .populate('userId', 'name profilePicture') // Populate user details
                .populate('communityId', 'name') // Populate community details
                .populate('reactions') // Populate reactions
                .populate('poll'); // Populate poll
    
            if (posts.length === 0) {
                return res.status(404).json({ message: 'No posts found for this community' });
            }
    
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    };
}

exports.createPost = async (req, res) => {
    const { communityId, userId, content, image } = req.body;

    try {

        const post = new Post({ communityId, userId, content, image });
        await post.save();


        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        // Add the new post's ID to the community's posts array
        community.posts.push(post._id);
        await community.save();

        // Step 3: Respond with the created post
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create post' });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post.reactions.includes(userId)) {
            post.reactions.push(userId);
            await post.save();
            res.status(200).json({ message: 'Post liked', post });
        } else {
            res.status(400).json({ error: 'Already liked' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to like post' });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};
