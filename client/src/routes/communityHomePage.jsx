import { useEffect, useState } from "react";
import axios from "axios";
import PostList from "../components/postList/postList";
import Layout from "../components/layout/layout.jsx";
import CreatePost from "../components/createPost/createPost";

export const CommunityHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const communitySlug = "testnew"; // Replace with actual slug dynamically if needed

  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/community/${communitySlug}`
        );
        const community = response.data.community;
        console.log("Community data:", community);
        setPosts(community.posts || []); 
        console.log("community post",community.post)// Extract only the posts from the response
      } catch (err) {
        setError("Failed to fetch community data");
        console.error("Error fetching community:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [communitySlug]);

  const handleLike = async (id) => {
    try {
      await axios.post(`/api/posts/${id}/like`, { userId: "currentUserId" });
      alert(`Liked post with ID: ${id}`);
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleComment = (id) => alert(`Commented on post with ID: ${id}`);
  const handleShare = (id) => alert(`Shared post with ID: ${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
