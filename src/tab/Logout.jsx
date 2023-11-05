import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center w-full min-h-fit">
      <div className="justify-center items-center mt-10 w-[95%] md:w-[40%] rounded-md bg-white p-3 m-2">
        <h1 className="text-4xl text-center font-semibold">Tack-A-Tive</h1>
      </div>
      <div className="flex flex-col justify-center w-[95%] md:w-[40%] rounded-md bg-white p-3 m-2">
        <div className="flex flex-row  items-center justify-between w-full mb-6">
          <button
            className={`px-4 py-2 rounded-full w-[45%] shadow-inner ${
              login ? `bg-blue-400  text-white` : `bg-slate-300 `
            } `}
            onClick={() => {
              setLogin(true);
            }}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full w-[45%] shadow-inner ${
              !login ? `bg-blue-400  text-white` : `bg-slate-300`
            } `}
            onClick={() => {
              setLogin(false);
            }}
          >
            Signup
          </button>
        </div>
        {login ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Logout;
