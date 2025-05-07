import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { TokenContext } from "./TokenDecode";
const PostEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [initialPost, setInitialPost] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const { userData } = useContext(TokenContext);
 
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: "",
      location: "",
      country: "",
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://airbnb-backend-e9ka.onrender.com/api/detailedpost/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInitialPost(res.data);
       

        reset(res.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [id, reset]);
  useEffect(() => {
    if (userData && initialPost) {
      setIsOwner(initialPost.userId === userData.id);
    }
  }, [userData, initialPost]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://airbnb-backend-e9ka.onrender.com/api/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      reset({
        title: "",
        description: "",
        image: "",
        price: "",
        location: "",
        country: "",
      });
      navigate("/");
      toast.success("post updated successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update");
    }
  };

  if (!initialPost) return <p>Loading...</p>;

  return (
    <div>
      <form className="creat-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Enter your Title</label>
          <br />
          <input
            className="create-form-input"
            id="title"
            type="text"
            placeholder="enter a title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="description">Enter a Description</label>
          <br />
          <input
            className="create-form-input"
            id="description"
            type="text"
            placeholder="enter a description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="image">Upload image</label>
          <br />
          <input
            className="create-form-input"
            id="image"
            type="text"
            placeholder="enter a image"
            {...register("image")}
          />
          {errors.image && (
            <p style={{ color: "red" }}>{errors.image.message}</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="price">Enter price</label>
          <br />
          <input
            className="create-form-input"
            id="price"
            type="number"
            placeholder="enter price"
            {...register("price", { required: "price is required" })}
          />
          {errors.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="location">Enter a location</label>
          <br />
          <input
            className="create-form-input"
            id="location"
            type="text"
            placeholder="enter location"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p style={{ color: "red" }}>{errors.location.message}</p>
          )}
        </div>
        <br />
        <div>
          <label htmlFor="country">Enter country</label>
          <br />
          <input
            className="create-form-input"
            id="country"
            type="text"
            placeholder="enter country"
            {...register("country", { required: "country is required" })}
          />
          {errors.country && (
            <p style={{ color: "red" }}>{errors.country.message}</p>
          )}
        </div>
        <br />
        <div>
          
            <button className="create-form-button" type="submit">
              Submit
            </button>
        
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
