import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { BellIcon, Search } from "lucide-react";
import { ChatState } from "../context/ChatProvider";
import Profile from "./Profile";
import SearchUser from "./SearchUser";

const NavBar = () => {
  const [popup, setPopup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  // const [user,setUser] = useState
  const { user } = ChatState();

  useEffect(() => {
    if (!user) {
      navigate("/logout");
    }
  }, [user, navigate]);
  // console.log(user);

  const closeProfile = () => {
    setOpenProfile((prev) => !prev);
  };
  const closeSearch = () => {
    setOpenSearch(false);
  };
  const LogoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/Logout");
  };

  return (
    <div className="flex felx-row justify-between items-center px-5 h-[60px] w-full bg-white">
      <div className="flex flex-row justify-center items-center w-[100%] max-w-[270px] min-w-[150px]">
        <Search color="black" size={20} />

        <SearchUser close={closeSearch} />
      </div>

      <NavLink className="text-lg hidden md:flex " to="/chat">
        Talk-A-Tive
      </NavLink>

      <div className="flex flex-row justify-between items-center w-[90px]">
        <div>
          <BellIcon color="black" size={20} />
        </div>
        <button
          onClick={() => {
            setPopup((prev) => !prev);
            console.log("popup");
          }}
        >
          <div className="w-fit h-fit p-1">
            <img
              className=" mx-auto rounded-full bg-slate-500 w-[50px] h-[50px]"
              width={50}
              height={50}
              src={user?.pic}
              alt="original"
            />
          </div>
        </button>
        {/* <div className="rounded-full h-9 w-9 bg-slate-400 p-1">
        
          <img
            className="object-scale-down"
            src="https://static.thenounproject.com/png/4038155-200.png"
            alt="user"
          />
        </div> */}
      </div>
      {popup && (
        <div className="absolute right-[20px] top-[62px] px-2 py-1 min-w-[200px] w-fit h-fit bg-slate-200 rounded-md">
          <button
            className="block text-lg font-semibold"
            onClick={() => {
              setOpenProfile((prev) => {
                return !prev;
              });
            }}
          >
            My Profile
          </button>
          <button
            className="block text-lg font-semibold"
            onClick={() => {
              LogoutHandler();
            }}
          >
            Logout
          </button>
        </div>
      )}
      {openProfile && <Profile user={user} close={closeProfile} />}
    </div>
  );
};

export default NavBar;
