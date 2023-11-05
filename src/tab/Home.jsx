import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-screen">
      <button
        onClick={() => {
          navigate("/logout");
        }}
      >
        Login
      </button>
      Home
    </div>
  );
};

export default Home;
