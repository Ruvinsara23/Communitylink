import PostList from '../components/postList/postList';
import Layout from '../components/layout/layout.jsx';
import CreatePost from '../components/createPost/createPost';
import Cover from '../assets/cover.jpg'

const dummyPosts = [
  {
    id: 1,
    content: "Excited to share my first post here!",
    author: "John Doe",
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-12-10",
    image:`${Cover}` ,
  },
  {
    id: 2,
    content: "This is a beautiful day to build new things!",
    author: "Jane Doe",
    authorImage: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2024-12-09",
  },
  {
    id: 3,
    content: "Loving the coding journey every single day.",
    author: "Alex Smith",
    authorImage: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2024-12-08",
    image: "https://source.unsplash.com/random/701x400",
  },
  {
    id: 4,
    content: "Let’s create amazing apps together!",
    author: "Emily Davis",
    authorImage: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2024-12-07",
  },
];

export const CommunityHomePage=()=> {
  const handleLike = (id) => alert(`Liked post with ID: ${id}`);
  const handleComment = (id) => alert(`Commented on post with ID: ${id}`);
  const handleShare = (id) => alert(`Shared post with ID: ${id}`);


  return (
    <Layout>
      <h1 className="text-3xl font-bold  mt-4 mb">Community Feed</h1>
      <CreatePost />
      <PostList
        posts={dummyPosts}
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
      />
      </Layout>
  );
}
