import React, { useState } from "react";
import Compressor from "compressorjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from "../env";
import Loading from "../components/Loading";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [conf_password, setConfPass] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [compressed, setcompressed] = useState();

  const convertToBase_64 = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        // console.log(reader.result);
        // setPic(reader.result);
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const compress = (image) => {
    return new Promise((resolve, reject) => {
      new Compressor(image, {
        quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
        maxHeight: 600,
        maxWidth: 600,
        success(compressedResult) {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          console.log("compressed: ", compressedResult);
          // setcompressed(URL.createObjectURL(compressedResult));
          // setPic(compressedResult);
          resolve(compressedResult);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const picHandler = async (e) => {
    const image = e.target.files[0];
    // setPic(URL.createObjectURL(image));
    console.log("Original :", image);
    const compressed_image = await compress(image);
    const base64 = await convertToBase_64(compressed_image);
    setPic(base64);
    console.log(pic);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !name || !password || !conf_password) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }
    if (password !== conf_password) {
      alert("Password doesn't matched");
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
        URL + "/api/user/register",
        { name, email, password, pic },
        config
      );

      alert("User Registered Successfully");
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
        <h1 className="text-lg font-semibold">Name</h1>
        <input
          className="border-2 w-full rounded-md p-1"
          placeholder="Enter Your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="m-1">
        <h1 className="text-lg font-semibold">Confirm Password</h1>
        <input
          className="border-2 w-full rounded-md p-1"
          placeholder="Confirm Your Password"
          type="password"
          value={conf_password}
          onChange={(e) => setConfPass(e.target.value)}
        />
      </div>
      <div className="m-1">
        <h1 className="text-lg font-semibold">Upload Your Picture</h1>
        <input
          className="border-2 w-full rounded-md p-1"
          // placeholder="Confirm Your Password"
          type="file"
          accept="image/*"
          onChange={picHandler}
        />
      </div>
      {pic && (
        <img
          className=" mx-auto rounded-full p-2 w-[150px] h-[150px]"
          width={100}
          height={100}
          src={pic}
          alt="original"
        />
      )}
      {/* <img
        className="rounded-full p-2 w-[70px] h-[70px]"
        width={50}
        height={50}
        src={compressed}
        alt="compressed"
      /> */}
      <button
        className={`flex my-3 items-center justify-center w-full text-center text-white rounded-md ${
          loading ? `bg-blue-300` : `bg-blue-500`
        }  p-1`}
        disabled={loading}
        onClick={() => {
          submitHandler();
          console.log(name, email, password, conf_password, pic);
        }}
      >
        {loading ? <Loading /> : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;
