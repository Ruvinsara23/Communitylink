import { useEffect, useState } from 'react';
import axios from 'axios';
import PostList from '../components/postList/postList';
import Layout from '../components/layout/layout.jsx';
import CreatePost from '../components/createPost/createPost';

export const CommunityHomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/post');
                setPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleLike = async (id) => {
        try {
            await axios.post(`/api/posts/${id}/like`, { userId: 'currentUserId' }); 
            alert(`Liked post with ID: ${id}`);
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    const handleComment = (id) => alert(`Commented on post with ID: ${id}`);
    const handleShare = (id) => alert(`Shared post with ID: ${id}`);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-yellow-300 to-black">
                Welcome
            </h1>
            <CreatePost />
            <PostList
                posts={posts}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
            />
        </Layout>
    );
};
