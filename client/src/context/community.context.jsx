import React, { createContext, useContext, useState, useEffect, } from "react";
import { useParams } from "react-router";
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
  const [chat,setChat] = useState([]);
  const [members,setMembers] = useState([]);
  const [events,setEvents] = useState([]);
  const [polls,setPolls] = useState([]);  
  const [communityId, setCommunityId] = useState  ('');
  const [bannerImage, setBannerImage] = useState(null);
  const [communityImage, setCommunityImage] = useState(null); 
  const [description, setDescription] = useState('');
  const[name,setname]=useState('');
  const { slug } = useParams();


  const userId = "6797b1599c75bd4a3a6a8ade"; 
  const fetchCommunitiesByUser = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/community/user/${userId}`);
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
      const response = await axios.get(`http://localhost:8000/api/community/${slug}`)
      setPosts(response.data.posts);
      setChat(response.data.chat);
      setMembers(response.data.members);
      setEvents(response.data.events);
      setPolls(response.data.polls);
      setCommunityImage(response.data.communityImage );
      setBannerImage(response.data.community.bannerImage);
      setDescription(response.data.community.description);
      setname(response.data.community.name);
      console.log("Banner",response.data.community.bannerImage);
      console.log("CommunityImage",response.data.community.communityImage);
      console.log("Description",response.data.community.description);
      setCommunityId(response.data.community._id);
      console.log("communityId",response.data.community._id); 


      console.log("Response",response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching community posts");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCommunitiesByUser(userId);
    fetchCommunityPosts (slug)
  }, [userId,slug]);

  return (
    <CommunityContext.Provider
      value={{
        createdCommunities,
        adminCommunities,
        memberCommunities,
        fetchCommunitiesByUser,
        loading,
        error,
        fetchCommunityPosts,
        posts,
        chat,
        members,
        events,
        polls,
        communityId,
        bannerImage,
        communityImage,
        description,
        setBannerImage,
        setDescription,
        setCommunityImage,
        name,

      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
