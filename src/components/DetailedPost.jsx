import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import Rating from "./Rating";

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showRating, setShowRating] = useState(false);

  const detail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/detailedpost/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
          
        }
      );

      setPost(response.data);
    } catch (error) {
      console.error("Error occord", error);
    }
  };
  useEffect(() => {
    detail();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="detailed-post-data">
      <div className="post-container-div">
        <div className="main-post-data">
          <h1 className="dark-text">{post.title}</h1>
          <img className="post-images-img" src={post.image?.url} alt={post.title} />
          <div className="post-all-text">
            <p className="dark-text">
              ₹ {post.price} <span className="dark-text">/ per night</span>
            </p>
            <p className="dark-text">{post.description}</p>
            <p className="dark-text">
              {post.location}, {post.country}
            </p>
          </div>
          <div className="detailed-edit-delete-button ">
            <Link to={`/edit/${post._id}`}>
              <button type="button" className="custom-warning-btn">
                Edit
              </button>
            </Link>
            <DeletePost id={post._id} />
          </div>
        </div>
        <div className="review-section">
          <h1>Add a review</h1>
          <div style={{ padding: "20px" }}>
            <button
              className="custom-warning-rating-btn"
              onClick={() => setShowRating(!showRating)}
            >
              {showRating ? "Hide Reviews" : "Show Reviews"}
            </button>

            {showRating && (
              <div style={{ marginTop: "20px" }}>
                <Rating postId={post._id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
