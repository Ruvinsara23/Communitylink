import { Link, Outlet, useParams,useNavigate } from "react-router-dom";
import { useUser } from "../../context/user.context";
import { useEffect } from "react";

const Navbar = () => {
  const { communitySlug } = useParams();
  const { currentUser, setCurrentUser } = useUser(); // Extract the slug from the URL
  const navigate = useNavigate(); 

 


  const handleSignOut = () => {
    setCurrentUser(null);
     // Clear the currentUser state

  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-purple-700 font-bold text-xl hover:text-indigo-900"
          >
            <img src="/logo.png" alt="" className="h-8 w-auto mr-2" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
              Community Feed
            </h1>
          </Link>
        </div>

        <ul className="flex space-x-6">
          <li>
            <Link
              to={`/community/${communitySlug || "default-community"}`} // Use a fallback if no slug is provided
              className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
            >
              Feeds
            </Link>
          </li>
          <li>
            <Link
              to={`/community/${communitySlug || "default-community"}/members`}
              className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
            >
              Members
            </Link>
          </li>
          <li>
            <Link
              to={`/community/${communitySlug || "default-community"}/about`}
              className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 mr-7 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={`/community/${communitySlug || "default-community"}/chat`}
              className="text-purple-700 font-bold border-2 border-purple-300 px-4 py-2 rounded-md hover:bg-purple-100 hover:border-purple-500 transition"
            >
              Chat Room
            </Link>
          </li>
          
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-500 hover:bg-blue-700 font-bold px-4 py-2 rounded-md transition"
            >
              Follow the Community
            </button>
          
        </ul>
       
      </div>
      <Outlet /> {/* Render nested components here */}
    </nav>
  );
};

export default Navbar;