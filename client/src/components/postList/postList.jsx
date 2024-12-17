
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'



// eslint-disable-next-line react/prop-types
const PostList = ({ posts, onLike, onComment, onShare }) => {
    return (
      <div className="space-y-4 max-w-[742px] mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
       
            <div className="flex items-center mb-4">
              <img
                src={post.authorImage}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
  
            <p className="mb-4">{post.content}</p>
  
          
            {post.image && (
              <div className="mb-4">
                <img
                  src={post.image}
                  alt="Post image"
                  width={700}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            )}
  
           
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike && onLike(post.id)} // Trigger Like action
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment && onComment(post.id)} 
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Comment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare && onShare(post.id)} 
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default PostList;