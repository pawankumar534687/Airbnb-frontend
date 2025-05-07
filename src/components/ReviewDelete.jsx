import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'


const ReviewDelete = ({id}) => {
    

    const deletereview = async()=>{
        try {
          const token = localStorage.getItem("token")
             axios.delete(`http://localhost:8000/api/review/${id}`, {
              headers:{
                Authorization: `Bearer ${token}`
              }
             })
           
            toast.success("review deleted")
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete review");
        }
       
    }





  return (
    <div>
      

  <button onClick={deletereview} type='button' className="review-delete-button custom-danger-btn-class">delete</button> 


    </div>
  )
}

export default ReviewDelete
