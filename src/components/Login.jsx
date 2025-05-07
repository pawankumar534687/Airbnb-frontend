import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../App";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://airbnb-backend-e9ka.onrender.com/api/login",
        data
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      toast.success(" login succsesfully");
      reset({
        identifier: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast.error(error.response?.data?.error || "Failed to submit");
    }
  };

  return (
    <div className="login-form">
      <h1 className="login-form-heading">Login form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="identifier">Enter username or phone or email</label>
          <br />
          <input
            className="login-form-input"
            type="text"
            id="identifier"
            placeholder="Enter identifier"
            {...register("identifier", { required: "identifier is required" })}
          />
          {errors.identifier && (
            <p style={{ color: "red" }}>{errors.identifier.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="login-form-input"
            type="password"
            id="password"
            placeholder="Enter password"
            {...register("password", { required: "password is required" })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <button className="custom-danger-btn" type="submit">
          submit
        </button> 
        <Link to="/signup"className="Link-blue">signup page</Link>
      </form>
    
    </div>
  );
};

export default Login;
