import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./tab/Home";
import Logout from "./tab/Logout";
import Chat from "./tab/Chat";
import { useEffect } from "react";
// import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chat");
    } else {
      navigate("/logout");
    }
  }, [navigate]);

  return (
    <div className="w-full h-fit min-h-screen bg-chat bg-center bg-no-repeat bg-cover ">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Chat />} path="/chat" />
      </Routes>
    </div>
  );
}

export default App;
