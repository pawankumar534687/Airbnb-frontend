import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
   const navigate = useNavigate();
    const handleRemove = ()=>{
        toast.success("Logout succsesfully")
        localStorage.removeItem("token")
        navigate("/login");
    }

    const token = localStorage.getItem("token")
  return (
    <div >
      {token && (
 <button onClick={handleRemove} className="custom-danger-btn-class-logout">Logout</button>
      )}
     
    </div>
  )
}

export default Logout
