import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
       
        console.error("No token found");
        return;
      }
      const response = await axios.get("http://localhost:8000/api/show", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setAllPosts(response.data);

    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
    
    <div className="post-list post-container">
      {allPosts.map((post) => (
        <Link className="posts-link-none"  key={post._id} to={`/detailedpost/${post._id}`}>
          <div >
            <div className="main-post-data" >
              <img className="post-images" src={post.image?.url} alt={post.title} />
              <div className="post-all-text">
                <p className="text-blur">{post.title}</p>
                <p className="dark-text">
                  ₹ {post.price} <span className="text-blur">/ per night</span>
                </p>
                <p className="text-blur">{post.description}</p>
                <p className="dark-text">
                  {post.location}, {post.country}
                </p>
               
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default Home;
