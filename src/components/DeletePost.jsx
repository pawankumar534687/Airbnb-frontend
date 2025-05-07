import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const DeletePost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const deletePost = async () => {
        try {
            const token = localStorage.getItem("token")
             axios.delete(`http://localhost:8000/api/post/${id}`, {
                headers:{
                    Authorization: `Bearere ${token}`
                }
             });
            toast.success("post delete succsesfully");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete post");
        }
    };

    return (
        <div>
             <button onClick={deletePost} type="button" className="custom-danger-btn">
                Delete
              </button>
        </div>
    );
};

export default DeletePost;
