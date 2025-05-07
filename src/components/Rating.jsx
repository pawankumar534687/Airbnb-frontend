import { useState, useEffect } from "react";
import axios from "axios";
import ReviewDelete from "./ReviewDelete";
import { toast } from "react-toastify";

function Rating({ postId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewData, setreviewData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("postId: ", postId);
    try {
      const token = localStorage.getItem("token")
      await axios.post("http://localhost:8000/api/review", {
        rating,
        comment,
        postId,
      }, {
        headers:{
         Authorization: `Bearer ${token}`
        }
      });

     
      setRating(0);
      setComment("");
      showreview();
      toast.success("review created succsesfully");
    } catch (error) {
      console.log(error);
      toast.error("faild to save review");
    }
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 5) {
      setRating(value);
    }
  };

  const showreview = async () => {
    try {
    const token = localStorage.getItem("token")
      const rating = await axios.get(
        `http://localhost:8000/api/review/${postId}`, {
          headers:{
           Authorization: `Bearer ${token}`
          }
        }
      );
      setreviewData(rating.data);
     
    } catch (error) {
      console.error("review show not working", error);
    }
  };
  useEffect(() => {
    if (postId) {
      showreview();
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "gold" : "gray",
                fontSize: "24px",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <br />

        <div>
          <input
            type="number"
            name="rating"
            value={rating}
            min="1"
            max="5"
            onChange={handleInputChange}
            required
          />

          <input
            type="text"
            placeholder="Please comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            required
            value={comment}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <div className="all-reviews">
        {Array.isArray(reviewData) &&
          reviewData.map((item,index) => (
            <div key={item._id} className="single-review-rating">
              <p>{item.rating} ★ </p>
              <br />
              <p>{item.comment}</p>
              <br />
              <p>{new Date(item.createdAt).toLocaleString()}</p>

              <ReviewDelete id={item._id}/>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Rating;
