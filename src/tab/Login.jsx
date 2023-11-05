import React, { useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../env";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        URL + "/api/user/login",
        { email, password },
        config
      );

      alert("Login Successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        alert(err?.response?.data?.message);
      } else {
        alert("some error occured");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="m-1">
        <h1 className="text-lg font-semibold">Email Address</h1>
        <input
          className="border-2 w-full rounded-md p-1"
          placeholder="Enter Your Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="m-1">
        <h1 className="text-lg font-semibold">Password</h1>
        <input
          className="border-2 w-full rounded-md p-1"
          placeholder="Enter Your Password"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button
        className={`flex my-3 items-center justify-center w-full text-center text-white rounded-md ${
          loading ? `bg-blue-300` : `bg-blue-500`
        }  p-1`}
        disabled={loading}
        onClick={() => {
          submitHandler();
        }}
      >
        {loading ? <Loading /> : "Login"}
      </button>
    </div>
  );
};

export default Login;
