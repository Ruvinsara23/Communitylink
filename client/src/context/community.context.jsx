import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const CommunityContext = createContext();


export const useCommunity = () => useContext(CommunityContext);


export const CommunityProvider = ({ children }) => {
  const [createdCommunities, setCreatedCommunities] = useState([]);
  const [adminCommunities, setAdminCommunities] = useState([]);
  const [memberCommunities, setMemberCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts,setPosts] = useState([]);


  const userId = "674c4b8c931d4af7065ee1c0"; 
  const fetchCommunitiesByUser = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/community/user/674c4b8c931d4af7065ee1c0`);
      console.log("Response",response.data);
      const { createdCommunities, adminCommunities, memberCommunities,} = response.data;
      setCreatedCommunities(createdCommunities);
      setAdminCommunities(adminCommunities);
      setMemberCommunities(memberCommunities);
      

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching communities");
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityPosts = async (slug) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/community/${slug}/posts`);
      setPosts(response.data.posts);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching community posts");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCommunitiesByUser();
  }, [userId]);

  return (
    <CommunityContext.Provider
      value={{
        createdCommunities,
        adminCommunities,
        memberCommunities,
        fetchCommunitiesByUser,
        loading,
        error,
        fetchCommunityPosts
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
