import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const CreatePost = () => {
  const navigate = useNavigate();

  const {
    handleSubmit, register, formState: { errors },
    reset
  } = useForm()
  const onSubmit = async (data)=>{
    
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("country", data.country);
      formData.append("image", data.image[0]); 
  
      const response = await axios.post("https://airbnb-backend-e9ka.onrender.com/api/create-post-form", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }

      })

       if (response.data && response.data.message) {
      toast.success(response.data.message); 
    } else {
      toast.success("Post created successfully");
    }
      reset();
     
      navigate("/");

    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to submit");
    }
    
  }



  return (
    <div>
      <form  className='creat-post-form' onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label htmlFor="title">Enter your Title</label>
        <br />
        <input className='create-form-input' id='title' type="text" placeholder='enter a title' {...register("title", {required: "Title is required"})}/>
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        </div>
        <br />
        <div>
        <label htmlFor="description">Enter a Description</label>
        <br />
        <input  className='create-form-input'  id='description' type="text" placeholder='enter a description' {...register("description", {required: "Description is required"})}/>
        {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        </div>
        <br />
        <div>
        <label htmlFor="image">Uplode image</label>
        <br />
        <input
  type="file"
  {...register("image", { required: "Image is required" })}
/>

        {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
        </div>
        <br />
        <div>
        <label htmlFor="price">Enter price</label>
        <br />
        <input className='create-form-input' id='price' type="number" placeholder='enter price' {...register("price", {required: "price is required"})} />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
        </div>
        <br />
        <div>
        <label htmlFor="location">Enter a location</label>
        <br />
        <input className='create-form-input' id='location' type="text" placeholder='enter location' {...register("location", {required: "Location is required"})}/>
        {errors.location && <p style={{ color: "red" }}>{errors.location.message}</p>}
        </div>
<br />
<div>
        <label htmlFor="country">Enter country</label>
       <br />
        <input className='create-form-input' id='country' type="text" placeholder='enter country' {...register("country", {required: "country is required"})}/>
        {errors.country && <p style={{ color: "red" }}>{errors.country.message}</p>}
        </div>
        <br />
        <div>
        <button className='create-form-button' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
