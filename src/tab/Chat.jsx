import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import CreateGroup from "../components/CreateGroup";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [groupPopup, setGroupPopup] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();
  // const navigation = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/logout");
    } else if (!user) {
      console.log("waite");
    } else {
      console.log("user", user);
      setLoading(false);
    }
  }, [user, navigate]);

  window.onpopstate = (e) => {
    setSelectedChat(null);
  };

  const closeCreateGroup = () => {
    setGroupPopup(false);
  };

  if (loading) {
    return (
      <div className="flex absolute top-0 left-0 justify-center items-center bg-black/50 h-screen w-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="w-full h-full flex flex-row">
        <div
          className={`md:min-w-[270px] w-full max-w-[calc(100vw-10px)] md:w-[35%] h-[88.9vh] m-2 mr-2 md:mr-1 bg-white rounded-lg ${
            selectedChat && `hidden`
          } md:flex md:flex-col`}
        >
          <div className=" w-full h-14 flex flex-row justify-between px-4 py-2">
            <h1 className="text-2xl"> My Chats</h1>
            <button
              className="text-lg p-2 bg-slate-300 hover:bg-slate-400 rounded-lg"
              onClick={() => {
                setGroupPopup(true);
              }}
            >
              Create Groups +
            </button>
          </div>

          <div className="w-full h-[calc(100%-57px)]">
            <MyChats />
          </div>
        </div>
        <div
          className={`md:max-w-[calc(100%-270px)] w-full max-w-[calc(100vw-10px)] md:w-[calc(65%-4px)] h-[88.9vh] m-2 ml-2 md:ml-1 bg-white rounded-lg ${
            !selectedChat && `hidden`
          } md:flex`}
        >
          <ChatBox />
        </div>
      </div>
      {groupPopup && (
        <div className="f h-full w-full">
          <CreateGroup close={closeCreateGroup} />
        </div>
      )}
    </div>
  );
};

export default Chat;
