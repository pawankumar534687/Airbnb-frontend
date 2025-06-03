import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleRemove = () => {
   
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    window.location.reload()
     toast.success("Logout succsesfully");
  };

  return (
    <div>
      {token && (
        <button
          onClick={handleRemove}
          className="custom-danger-btn-class-logout"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Logout;
