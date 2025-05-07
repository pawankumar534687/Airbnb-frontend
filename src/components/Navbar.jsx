import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token")
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img className="logo-airbnb" src="/airbnb.png" alt="logo" />
          <span>airbnb</span>
        </div>
       
        {/* Desktop Menu */}
        <div className="menu">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active menu-item  hover-color" : "menu-item"
            }
            to="/"
          >
            Home
          </NavLink>
          {!token && (
            <>
            <NavLink
            className={({ isActive }) =>
              isActive ? "active menu-item hover-color" : "menu-item"
            }
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active menu-item hover-color" : "menu-item"
            }
            to="/login"
          >
           Login
          </NavLink>
          </>
          )}
          
          <NavLink
            className={({ isActive }) =>
              isActive ? "active menu-item hover-color" : "menu-item"
            }
            to="/create-post"
          >
            Create Post
          </NavLink>
          
          <Logout />
        
         
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active mobile-menu-item hover-color"
                : "menu-item mobile-menu-item"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active mobile-menu-item hover-color"
                : "menu-item mobile-menu-item"
            }
            to="/signup"
          >
            Sign up
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active menu-item hover-color" : "menu-item"
            }
            to="/login"
          >
           Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active mobile-menu-item hover-color"
                : "menu-item mobile-menu-item"
            }
            to="/create-post"
          >
            Create Post
          </NavLink>
          
         
        
          <Logout />
       
        </div>
      )}
      
    </nav>
  );
}

export default Navbar;
