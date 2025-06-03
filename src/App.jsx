import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import DetailedPost from "./components/DetailedPost";
import PostEdit from "./components/PostEdit";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import TokenDecode from "./components/TokenDecode";
import { useLocation } from "react-router-dom";

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};


const hideRoute = ['/signup', '/login', '/logout']



function App() {

  const location = useLocation()

  const shouldHideRouter = hideRoute.includes(location.pathname)


  return (
    <>
      <TokenDecode>
        <Navbar isAuthenticated={isAuthenticated()} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="/detailedpost/:id" element={<DetailedPost />} />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <PostEdit />
              </ProtectedRoute>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        { !shouldHideRouter && <Footer />}
      </TokenDecode>
    </>
  );
}

export default App;
